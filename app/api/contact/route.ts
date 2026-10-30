import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("Ingrese un correo electrónico válido")
    .max(150, "El correo electrónico es demasiado largo"),
  topic: z.string().trim().max(100).optional(),
  subject: z
    .string()
    .trim()
    .max(150, "El asunto no puede exceder 150 caracteres")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(3000, "El mensaje no puede exceder 3000 caracteres"),
  _hp: z.string().optional(), // Honeypot spam trap
});

// Simple in-memory rate limiting: at most 5 messages per IP per 10 minutes
const ipRequests = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || entry.expiresAt < now) {
    ipRequests.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) {
    return true;
  }
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Ha enviado demasiadas solicitudes recientemente. Por favor, espere unos minutos antes de volver a intentarlo.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Cuerpo de solicitud inválido" },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Datos del formulario inválidos";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, topic, subject, message, _hp } = parsed.data;

    // Honeypot trap: if a bot filled the hidden input, pretend success without doing anything
    if (_hp && _hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Mensaje recibido correctamente.",
      });
    }

    const result = await sendContactEmail({
      name,
      email,
      topic,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      delivered: result.delivered,
      message:
        "¡Gracias por contactarnos! Su mensaje ha sido enviado con éxito. Le responderemos a la brevedad.",
    });
  } catch (error: any) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      {
        error:
          "Ocurrió un error al procesar su solicitud. Por favor intente más tarde o escríbanos directamente a reviewsnutritional@gmail.com.",
      },
      { status: 500 }
    );
  }
}

