import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendSubscriptionWelcomeEmail } from "@/lib/mail";

// Rate limiting in-memory map: max 5 subscription attempts per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Demasiadas solicitudes de suscripción desde esta conexión. Por favor, espere unos minutos.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!rawEmail || !EMAIL_REGEX.test(rawEmail) || rawEmail.length > 120) {
      return NextResponse.json(
        { error: "Por favor, introduce un correo electrónico válido." },
        { status: 400 }
      );
    }

    // 1. Save or update subscriber in the database
    try {
      await prisma.subscriber.upsert({
        where: { email: rawEmail },
        update: { active: true },
        create: { email: rawEmail, active: true },
      });
    } catch (dbErr) {
      console.error("[Subscribe API] Database error upserting subscriber:", dbErr);
      // Proceed even if DB temporary issue so user receives the email
    }

    // 2. Fetch the latest published products from DB to include in the notification email
    let latestProducts: any[] = [];
    try {
      latestProducts = await prisma.product.findMany({
        where: { status: "PUBLISHED" },
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          shortDescription: true,
          categoryType: true,
          buyNowLink: true,
        },
      });
    } catch (prodErr) {
      console.warn("[Subscribe API] Could not fetch products, using default showcase:", prodErr);
    }

    // 3. Send email to the subscriber with new product reviews and notification
    // Also alerts admin at reviewsnutritional@gmail.com
    await sendSubscriptionWelcomeEmail(rawEmail, latestProducts);

    return NextResponse.json({
      success: true,
      message:
        "¡Gracias por suscribirte! Te hemos enviado un correo con las últimas reseñas y análisis de nuevos productos.",
    });
  } catch (error) {
    console.error("[Subscribe API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu suscripción. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}

// GET endpoint to support 1-click unsubscribe links in emails
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const action = searchParams.get("action");

    if (action === "unsubscribe" && email) {
      await prisma.subscriber.updateMany({
        where: { email: email.trim().toLowerCase() },
        data: { active: false },
      });
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"><title>Suscripción Cancelada</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 60px 20px; background: #f8fafc;">
          <h1 style="color: #023e8a;">Suscripción Cancelada</h1>
          <p style="color: #475569;">Tu correo <strong>${email}</strong> ha sido dado de baja de nuestras notificaciones.</p>
          <a href="/" style="display: inline-block; margin-top: 20px; color: #0077b6; text-decoration: none; font-weight: bold;">Volver a NutritionalReviews.org &rarr;</a>
        </body>
        </html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    return NextResponse.json({ status: "Subscription service running" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

