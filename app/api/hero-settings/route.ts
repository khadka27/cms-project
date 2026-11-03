import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

type ClientBackgroundType = "gradient" | "image";

function toPrismaBackgroundType(v: unknown): "GRADIENT" | "IMAGE" {
  const s = typeof v === "string" ? v : "";
  return s.toUpperCase() === "IMAGE" ? "IMAGE" : "GRADIENT";
}

function toClientBackgroundType(v: string): ClientBackgroundType {
  return v === "IMAGE" ? "image" : "gradient";
}

function serializeHero<T extends { backgroundType: string }>(row: T) {
  return {
    ...row,
    backgroundType: toClientBackgroundType(row.backgroundType),
  };
}

/** Build Prisma update/create data from JSON body; drop immutable / unknown fields */
function bodyToHeroData(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};

  if (typeof body.title === "string") data.title = body.title;
  if (body.subtitle === null || body.subtitle === undefined)
    data.subtitle = null;
  else if (typeof body.subtitle === "string") data.subtitle = body.subtitle;

  if (typeof body.description === "string") data.description = body.description;
  if (typeof body.backgroundImage === "string")
    data.backgroundImage = body.backgroundImage;
  if (body.backgroundType !== undefined)
    data.backgroundType = toPrismaBackgroundType(body.backgroundType);

  if (typeof body.gradientFrom === "string")
    data.gradientFrom = body.gradientFrom;
  if (typeof body.gradientVia === "string") data.gradientVia = body.gradientVia;
  if (typeof body.gradientTo === "string") data.gradientTo = body.gradientTo;
  if (typeof body.textColor === "string") data.textColor = body.textColor;
  if (typeof body.primaryColor === "string")
    data.primaryColor = body.primaryColor;
  if (typeof body.ctaColor === "string") data.ctaColor = body.ctaColor;
  if (typeof body.accentColor === "string") data.accentColor = body.accentColor;

  if (body.overlayOpacity !== undefined) {
    const n =
      typeof body.overlayOpacity === "number"
        ? body.overlayOpacity
        : Number.parseInt(String(body.overlayOpacity), 10);
    if (!Number.isNaN(n)) data.overlayOpacity = n;
  }

  if (typeof body.backgroundPosition === "string")
    data.backgroundPosition = body.backgroundPosition;
  if (typeof body.backgroundSize === "string")
    data.backgroundSize = body.backgroundSize;

  if (body.buyNowLink === null || body.buyNowLink === "")
    data.buyNowLink = null;
  else if (typeof body.buyNowLink === "string")
    data.buyNowLink = body.buyNowLink;

  return data;
}

export async function GET() {
  try {
    let settings = await prisma.heroSettings.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (!settings) {
      settings = await prisma.heroSettings.create({
        data: {
          title: "Reseñas de suplementos en español, para comparar antes de comprar",
          subtitle: "Criterio Editorial y Análisis Basado en Fuentes Científicas",
          description:
            "NutritionalReviews.org es un sitio de reseñas de suplementos nutricionales, escrito en español para lectores de América Latina. En cada reseña reunimos qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo.",
          backgroundImage: "",
          backgroundType: "GRADIENT",
          gradientFrom: "#d4eff7",
          gradientVia: "#e5f5f9",
          gradientTo: "#daf0f6",
          primaryColor: "#023e8a",
          ctaColor: "#023e8a",
          accentColor: "#0077b6",
          textColor: "#0f172a",
          overlayOpacity: 30,
          backgroundPosition: "center",
          backgroundSize: "cover",
        },
      });
    }

    return NextResponse.json(serializeHero(settings), {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("Hero settings GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero settings" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const raw = await req.json();
    const body =
      raw && typeof raw === "object" && !Array.isArray(raw)
        ? (raw as Record<string, unknown>)
        : {};
    const data = bodyToHeroData(body);

    const existing = await prisma.heroSettings.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.heroSettings.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.heroSettings.create({
        data: {
          title: "Reseñas de suplementos en español, para comparar antes de comprar",
          subtitle: "Criterio Editorial y Análisis Basado en Fuentes Científicas",
          description:
            "NutritionalReviews.org es un sitio de reseñas de suplementos nutricionales, escrito en español para lectores de América Latina. En cada reseña reunimos qué contiene un producto según su etiqueta, qué promete el fabricante, qué evidencia hay disponible, sus ventajas y desventajas, y el precio y el lugar de compra verificados en la fecha indicada en el artículo.",
          backgroundImage: "",
          backgroundType: "GRADIENT",
          gradientFrom: "#d4eff7",
          gradientVia: "#e5f5f9",
          gradientTo: "#daf0f6",
          primaryColor: "#023e8a",
          ctaColor: "#023e8a",
          accentColor: "#0077b6",
          textColor: "#0f172a",
          overlayOpacity: 30,
          backgroundPosition: "center",
          backgroundSize: "cover",
          ...data,
        },
      });
    }

    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json(serializeHero(updated), {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("Hero settings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update hero settings" },
      { status: 500 },
    );
  }
}
