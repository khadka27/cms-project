import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject?: string;
  topic?: string;
  message: string;
}

export interface ProductNotificationItem {
  id?: string;
  name: string;
  slug?: string;
  price?: number;
  shortDescription?: string;
  detailedDescription?: string;
  image?: string;
  categoryType?: string;
  buyNowLink?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFormattedDate(): string {
  try {
    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toLocaleString("es-ES");
  }
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;

  if (!user || !rawPass) {
    return null;
  }

  // Strip spaces if user pasted Google App Password formatted as "xxxx xxxx xxxx xxxx"
  const pass = rawPass.replace(/\s+/g, "");

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5,
  });
}

function getAdminNotificationHtml(payload: ContactEmailPayload, dateStr: string): string {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeTopic = escapeHtml(payload.topic || "Consulta General");
  const safeSubject = escapeHtml(payload.subject || "Sin asunto especificado");
  const safeMessage = escapeHtml(payload.message);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #eef8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 62, 138, 0.08); border: 1px solid #d4eff7;">
    
    <!-- Top Header -->
    <div style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); padding: 28px 32px; color: #ffffff;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #d4eff7; background: rgba(255,255,255,0.18); padding: 4px 10px; border-radius: 999px;">
              NutritionalReviews.org
            </span>
          </td>
          <td style="text-align: right; font-size: 11px; color: #d4eff7; opacity: 0.9;">
            ${dateStr}
          </td>
        </tr>
      </table>
      <h1 style="margin: 16px 0 4px 0; font-size: 22px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff;">
        Nuevo Mensaje de Contacto
      </h1>
      <p style="margin: 0; font-size: 13px; color: #d4eff7; opacity: 0.95;">
        Recibido desde el formulario web de NutritionalReviews.org
      </p>
    </div>

    <!-- Main Body -->
    <div style="padding: 28px 32px;">
      
      <!-- Metadata Grid -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f8fbff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; width: 130px;">
            Remitente
          </td>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 14px; font-weight: 700; color: #0f172a;">
            ${safeName}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
            Correo
          </td>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 14px; color: #0077b6; font-weight: 600;">
            <a href="mailto:${safeEmail}" style="color: #0077b6; text-decoration: none;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
            Motivo
          </td>
          <td style="padding: 12px 18px; border-bottom: 1px solid #eef2f6; font-size: 13px;">
            <span style="display: inline-block; background-color: #d4eff7; color: #023e8a; padding: 3px 10px; border-radius: 6px; font-weight: 700; font-size: 12px;">
              ${safeTopic}
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 18px; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
            Asunto
          </td>
          <td style="padding: 12px 18px; font-size: 14px; color: #334155; font-weight: 600;">
            ${safeSubject}
          </td>
        </tr>
      </table>

      <!-- Message Content -->
      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
          Mensaje del usuario:
        </p>
        <div style="padding: 18px 20px; background-color: #f1f8fc; border-left: 4px solid #0077b6; border-radius: 0 12px 12px 0; font-size: 14px; line-height: 1.6; color: #0f172a; white-space: pre-wrap; word-break: break-word;">
${safeMessage}
        </div>
      </div>

      <!-- Quick Action: Reply directly -->
      <div style="text-align: center; margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(payload.subject || "Consulta NutritionalReviews")}" style="display: inline-block; background: #023e8a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 13px; box-shadow: 0 4px 12px rgba(2, 62, 138, 0.25);">
          Responder Directamente a ${safeName} &rarr;
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fbff; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
      NutritionalReviews.org &bull; Sistema de Notificaciones de Contacto
    </div>
  </div>
</body>
</html>`;
}

function getUserAutoReplyHtml(payload: ContactEmailPayload, dateStr: string): string {
  const safeName = escapeHtml(payload.name);
  const safeTopic = escapeHtml(payload.topic || "Consulta General");
  const safeSubject = escapeHtml(payload.subject || "Sin asunto especificado");
  const safeMessage = escapeHtml(payload.message);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Gracias por contactar a NutritionalReviews.org!</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #eef8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 62, 138, 0.08); border: 1px solid #d4eff7;">
    
    <!-- Top Header -->
    <div style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); padding: 32px; color: #ffffff; text-align: center;">
      <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #d4eff7; background: rgba(255,255,255,0.18); padding: 5px 14px; border-radius: 999px; margin-bottom: 12px;">
        NutritionalReviews.org
      </span>
      <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff;">
        ¡Gracias por comunicarte con nosotros!
      </h1>
      <p style="margin: 0; font-size: 13px; color: #d4eff7; opacity: 0.95;">
        Hemos recibido tu consulta y nuestro equipo editorial ya la está revisando.
      </p>
    </div>

    <!-- Main Body -->
    <div style="padding: 32px;">
      
      <!-- Personal Greeting -->
      <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #0f172a;">
        Hola <strong>${safeName}</strong>,
      </p>
      
      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #334155;">
        Gracias por escribir a <strong>NutritionalReviews.org</strong>. Nos tomamos muy en serio cada consulta, sugerencia o reporte de nuestra comunidad de lectores en América Latina.
      </p>

      <!-- Key Commitment Card: Response in 2-3 business days -->
      <div style="background: linear-gradient(135deg, #e8f9fd 0%, #f0fdf4 100%); border: 1.5px solid #00b4d8; border-radius: 14px; padding: 18px 22px; margin-bottom: 26px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 38px; vertical-align: top; font-size: 22px; line-height: 1;">
              ⏱️
            </td>
            <td>
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 800; color: #023e8a; letter-spacing: -0.01em;">
                Tiempo de respuesta estimado: 2 a 3 días hábiles
              </h3>
              <p style="margin: 0; font-size: 12.5px; line-height: 1.5; color: #334155;">
                Nuestro equipo revisa los mensajes de lunes a viernes. Recibirás una respuesta personalizada en tu correo electrónico dentro de este plazo.
              </p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Summary of Received Inquery -->
      <div style="background-color: #f8fbff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 26px;">
        <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
          Resumen de tu mensaje (${dateStr}):
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #64748b; width: 90px; font-weight: 600;">Motivo:</td>
            <td style="padding: 4px 0; color: #023e8a; font-weight: 700;">${safeTopic}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Asunto:</td>
            <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${safeSubject}</td>
          </tr>
        </table>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #cbd5e1; font-size: 13px; color: #475569; font-style: italic; line-height: 1.5; white-space: pre-wrap;">
&ldquo;${safeMessage}&rdquo;
        </div>
      </div>

      <!-- Next Steps & Helpful Links -->
      <div style="margin-bottom: 26px;">
        <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
          Mientras esperas nuestra respuesta, puedes explorar:
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0;">
              &bull; <a href="https://nutritionalreviews.org/products" style="color: #0077b6; text-decoration: none; font-weight: 600; font-size: 13px;">Catálogo de Reseñas de Suplementos &rarr;</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0;">
              &bull; <a href="https://nutritionalreviews.org/about" style="color: #0077b6; text-decoration: none; font-weight: 600; font-size: 13px;">Quiénes Somos y Criterio Editorial &rarr;</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0;">
              &bull; <a href="https://nutritionalreviews.org/legal/disclaimer" style="color: #0077b6; text-decoration: none; font-weight: 600; font-size: 13px;">Descargo de Responsabilidad de Salud &rarr;</a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Health disclaimer reminder -->
      <div style="padding: 12px 16px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; font-size: 11.5px; line-height: 1.5; color: #92400e;">
        <strong>Nota de Salud:</strong> NutritionalReviews.org es un medio informativo y no proporciona asesoramiento médico personalizado ni prescripciones. Si tu consulta se relaciona con una urgencia médica o síntoma específico, por favor consulta inmediatamente a un médico o especialista cualificado.
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fbff; padding: 22px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #023e8a;">
        NutritionalReviews.org
      </p>
      <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b;">
        Reseñas de suplementos en español para comparar antes de comprar.
      </p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">
        Contacto directo: <a href="mailto:reviewsnutritional@gmail.com" style="color: #0077b6; text-decoration: none;">reviewsnutritional@gmail.com</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter / New Products Email Notification System
// ─────────────────────────────────────────────────────────────────────────────

// Default showcase products when database has 0 products or for launch welcome
const DEFAULT_SHOWCASE_PRODUCTS: ProductNotificationItem[] = [
  {
    name: "Creatina Monohidrato Micronizada 100% Pura",
    slug: "creatina-monohidrato-micronizada",
    price: 29.99,
    categoryType: "NUTRA",
    shortDescription: "Pureza garantizada, solubilidad óptima y soporte muscular respaldado por evidencia científica rigurosa.",
  },
  {
    name: "Omega-3 Ultra Concentrado EPA & DHA",
    slug: "omega-3-ultra-concentrado-epa-dha",
    price: 34.50,
    categoryType: "NUTRA",
    shortDescription: "Destilación molecular de grado farmacéutico para salud cardiovascular, cerebral y articular.",
  },
  {
    name: "Aislado de Proteína de Suero (Whey Isolate 90%)",
    slug: "aislado-de-proteina-suero-whey-isolate",
    price: 49.90,
    categoryType: "NUTRA",
    shortDescription: "27g de proteína limpia por porción, sin lactosa ni azúcares añadidos, con perfil completo de aminoácidos.",
  },
];

function getSubscriberWelcomeHtml(
  subscriberEmail: string,
  products: ProductNotificationItem[],
  dateStr: string
): string {
  const safeEmail = escapeHtml(subscriberEmail);
  const displayProducts = products.length > 0 ? products : DEFAULT_SHOWCASE_PRODUCTS;

  const productCardsHtml = displayProducts
    .slice(0, 3)
    .map((prod) => {
      const safeName = escapeHtml(prod.name);
      const safeDesc = escapeHtml(
        prod.shortDescription ||
          "Análisis exhaustivo de etiquetado, pureza de ingredientes y comparativa de precios verificados en español."
      );
      const priceTag = prod.price ? `$${prod.price.toFixed(2)} USD` : "Precio verificado";
      const productUrl = prod.slug
        ? `https://nutritionalreviews.org/${prod.slug}`
        : "https://nutritionalreviews.org/products";

      return `
      <div style="background-color: #ffffff; border: 1px solid #d4eff7; border-radius: 14px; padding: 18px 20px; margin-bottom: 14px; box-shadow: 0 4px 12px rgba(2, 62, 138, 0.04);">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: middle;">
              <span style="display: inline-block; background-color: #e0f2fe; color: #023e8a; font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; margin-bottom: 6px;">
                NUEVA RESEÑA VERIFICADA
              </span>
              <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #0f172a; line-height: 1.3;">
                ${safeName}
              </h3>
              <p style="margin: 0 0 10px 0; font-size: 12.5px; line-height: 1.5; color: #475569;">
                ${safeDesc}
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="font-size: 13px; font-weight: 800; color: #0284c7;">
                    ${priceTag}
                  </td>
                  <td style="text-align: right;">
                    <a href="${productUrl}" style="display: inline-block; background-color: #023e8a; color: #ffffff; text-decoration: none; padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 700;">
                      Ver Reseña &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Bienvenido a NutritionalReviews.org!</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #eef8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 62, 138, 0.08); border: 1px solid #d4eff7;">
    
    <!-- Top Header -->
    <div style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); padding: 34px 32px; color: #ffffff; text-align: center;">
      <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #d4eff7; background: rgba(255,255,255,0.18); padding: 5px 14px; border-radius: 999px; margin-bottom: 14px;">
        NutritionalReviews.org
      </span>
      <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff;">
        ¡Bienvenido a nuestra comunidad!
      </h1>
      <p style="margin: 0; font-size: 13.5px; color: #d4eff7; opacity: 0.95;">
        Reseñas de suplementos en español para comparar antes de comprar.
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px;">
      
      <!-- Confirmation Badge -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); border: 1.5px solid #38bdf8; border-radius: 14px; padding: 18px 22px; margin-bottom: 26px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 36px; vertical-align: top; font-size: 22px; line-height: 1;">
              ✅
            </td>
            <td>
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 800; color: #023e8a;">
                Suscripción confirmada para: ${safeEmail}
              </h3>
              <p style="margin: 0; font-size: 12.5px; line-height: 1.5; color: #334155;">
                A partir de ahora recibirás alertas directas cuando publiquemos nuevos análisis de productos, comparativas de formulaciones y verificaciones de precios.
              </p>
            </td>
          </tr>
        </table>
      </div>

      <!-- New Products Section -->
      <div style="margin-bottom: 28px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <h2 style="margin: 0; font-size: 17px; font-weight: 900; color: #0f172a; letter-spacing: -0.01em;">
            ✨ Nuevos Productos y Reseñas Destacadas
          </h2>
        </div>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Aquí tienes una selección de suplementos analizados recientemente por nuestro equipo:
        </p>
        
        <!-- Cards -->
        ${productCardsHtml}
      </div>

      <!-- Our Standard -->
      <div style="background-color: #f8fbff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 26px;">
        <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #023e8a; text-transform: uppercase; letter-spacing: 0.05em;">
          Nuestro compromiso contigo:
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; line-height: 1.6; color: #334155;">
          <li style="margin-bottom: 6px;"><strong>Ingredientes reales:</strong> Analizamos lo que contiene la etiqueta tal como lo publica el fabricante.</li>
          <li style="margin-bottom: 6px;"><strong>Sin resultados inventados:</strong> Contrastamos los beneficios anunciados con la evidencia científica disponible.</li>
          <li style="margin-bottom: 6px;"><strong>Precios y enlaces verificados:</strong> Compras directamente con el vendedor, sin intermediarios.</li>
          <li><strong>Cero spam:</strong> Solo recibirás correos cuando haya análisis relevantes. Puedes cancelar tu suscripción con un solo clic.</li>
        </ul>
      </div>

      <!-- Call to Action -->
      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://nutritionalreviews.org/products" style="display: inline-block; background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 800; font-size: 14px; box-shadow: 0 4px 14px rgba(2, 62, 138, 0.25);">
          Explorar Todo el Catálogo de Productos &rarr;
        </a>
      </div>

      <!-- Disclaimer -->
      <div style="padding: 12px 16px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; font-size: 11px; line-height: 1.5; color: #92400e;">
        <strong>Descargo de responsabilidad de salud:</strong> NutritionalReviews.org es un medio puramente informativo y no ofrece asesoramiento médico, diagnósticos ni prescripciones personalizadas. Consulta siempre a un profesional sanitario cualificado antes de comenzar a tomar cualquier suplemento.
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fbff; padding: 22px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #023e8a;">
        NutritionalReviews.org
      </p>
      <p style="margin: 0 0 10px 0; font-size: 11px; color: #64748b;">
        Fecha de registro: ${dateStr}
      </p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">
        Contacto: <a href="mailto:reviewsnutritional@gmail.com" style="color: #0077b6; text-decoration: none;">reviewsnutritional@gmail.com</a>
        &bull;
        <a href="https://nutritionalreviews.org" style="color: #0077b6; text-decoration: none;">nutritionalreviews.org</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

function getNewProductBroadcastHtml(
  product: ProductNotificationItem,
  dateStr: string
): string {
  const safeName = escapeHtml(product.name);
  const safeDesc = escapeHtml(
    product.shortDescription ||
      product.detailedDescription ||
      "Nuevo análisis exhaustivo publicado en NutritionalReviews.org. Conoce los ingredientes verificados, promesas del fabricante, evidencia disponible y precio verificado."
  );
  const priceTag = product.price ? `$${product.price.toFixed(2)} USD` : "Verificado en tienda";
  const productUrl = product.slug
    ? `https://nutritionalreviews.org/${product.slug}`
    : "https://nutritionalreviews.org/products";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Producto Analizado: ${safeName}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #eef8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 62, 138, 0.08); border: 1px solid #d4eff7;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); padding: 30px 32px; color: #ffffff;">
      <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #d4eff7; background: rgba(255,255,255,0.18); padding: 4px 12px; border-radius: 999px; margin-bottom: 12px;">
        NUEVA PUBLICACIÓN &bull; ${dateStr}
      </span>
      <h1 style="margin: 0; font-size: 23px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff; line-height: 1.25;">
        ${safeName}
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 13.5px; color: #d4eff7;">
        Nuevo análisis nutricional disponible para la comunidad de NutritionalReviews.org
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 30px 32px;">
      
      <!-- Product Card -->
      <div style="background-color: #f8fbff; border: 1.5px solid #d4eff7; border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <span style="display: inline-block; background-color: #e0f2fe; color: #023e8a; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 10px;">
          PRECIO VERIFICADO: ${priceTag}
        </span>
        <h2 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 800; color: #0f172a;">
          ${safeName}
        </h2>
        <p style="margin: 0 0 18px 0; font-size: 13.5px; line-height: 1.6; color: #334155;">
          ${safeDesc}
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <a href="${productUrl}" style="display: inline-block; background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 13px; font-weight: 800;">
                Leer Reseña Completa &rarr;
              </a>
            </td>
            ${
              product.buyNowLink
                ? `<td style="text-align: right;">
                    <a href="${product.buyNowLink}" style="display: inline-block; background-color: #f0fdf4; border: 1px solid #86efac; color: #15803d; text-decoration: none; padding: 11px 20px; border-radius: 10px; font-size: 12.5px; font-weight: 700;">
                      Ver en Tienda &rarr;
                    </a>
                  </td>`
                : ""
            }
          </tr>
        </table>
      </div>

      <!-- What to check in this review -->
      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
          En este artículo analizamos:
        </p>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #334155;">
          <li>Fórmula y dosis reales por porción según etiqueta oficial.</li>
          <li>Evidencia científica frente a promesas del fabricante.</li>
          <li>Pros, contras y perfil de usuario ideal.</li>
          <li>Dónde comprarlo y precio verificado en la fecha del artículo.</li>
        </ul>
      </div>

      <!-- Health disclaimer -->
      <div style="padding: 12px 16px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; font-size: 11px; line-height: 1.5; color: #92400e;">
        <strong>Aviso:</strong> No vendemos suplementos directamente. Las compras se realizan a través de los enlaces de los distribuidores verificados. Consulta a un médico antes de iniciar cualquier suplementación.
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fbff; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
      Recibes este correo porque te suscribiste a las novedades de NutritionalReviews.org.<br>
      Contacto: <a href="mailto:reviewsnutritional@gmail.com" style="color: #0077b6; text-decoration: none;">reviewsnutritional@gmail.com</a>
    </div>

  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Exported Functions
// ─────────────────────────────────────────────────────────────────────────────

export async function sendContactEmail(payload: ContactEmailPayload) {
  const user = process.env.SMTP_USER;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "reviewsnutritional@gmail.com";
  const dateStr = getFormattedDate();
  const transporter = getTransporter();

  if (!transporter || !user) {
    console.warn(
      "[Nodemailer] SMTP_USER or SMTP_PASS not set in environment. Logging admin email and auto-reply to console:",
      {
        adminRecipient: receiver,
        userRecipient: payload.email,
        payload,
      }
    );
    return {
      success: true,
      delivered: false,
      autoReplyDelivered: false,
      message: "Mensaje recibido correctamente. (Configuración SMTP pendiente en servidor).",
    };
  }

  const topicPrefix = payload.topic ? `[${payload.topic}] ` : "";
  const adminSubject = `[NutritionalReviews] ${topicPrefix}${payload.subject || "Nuevo mensaje de contacto"}`;
  const adminHtml = getAdminNotificationHtml(payload, dateStr);

  // 1. Deliver primary notification to editorial inbox
  const adminInfo = await transporter.sendMail({
    from: `"NutritionalReviews Web" <${user}>`,
    replyTo: payload.email,
    to: receiver,
    subject: adminSubject,
    text: `Nuevo mensaje de ${payload.name} (${payload.email})\nMotivo: ${payload.topic || "General"}\nAsunto: ${payload.subject || "Sin asunto"}\nFecha: ${dateStr}\n\nMensaje:\n${payload.message}`,
    html: adminHtml,
  });

  // 2. Deliver automatic "Thank you / Reply in 2-3 business days" auto-reply to the user
  let autoReplyDelivered = false;
  try {
    const userSubject = `¡Gracias por contactarnos, ${payload.name}! — NutritionalReviews.org`;
    const userHtml = getUserAutoReplyHtml(payload, dateStr);

    await transporter.sendMail({
      from: `"NutritionalReviews.org" <${user}>`,
      replyTo: receiver,
      to: payload.email,
      subject: userSubject,
      text: `Hola ${payload.name},\n\n¡Gracias por contactar a NutritionalReviews.org!\n\nHemos recibido tu mensaje correctamente y nuestro equipo te responderá en un plazo estimado de 2 a 3 días hábiles.\n\nResumen de tu mensaje (${dateStr}):\n- Motivo: ${payload.topic || "Consulta General"}\n- Asunto: ${payload.subject || "Sin asunto"}\n- Mensaje:\n${payload.message}\n\nAtentamente,\nEquipo Editorial de NutritionalReviews.org\nreviewsnutritional@gmail.com\nhttps://nutritionalreviews.org`,
      html: userHtml,
    });
    autoReplyDelivered = true;
  } catch (autoReplyErr) {
    console.warn("[Nodemailer] Auto-reply failed to send to user:", autoReplyErr);
  }

  return {
    success: true,
    delivered: true,
    autoReplyDelivered,
    messageId: adminInfo.messageId,
  };
}

/**
 * Sends a welcome email containing latest / new product reviews to a new subscriber,
 * and notifies the administrator inbox of the new subscription.
 */
export async function sendSubscriptionWelcomeEmail(
  subscriberEmail: string,
  products: ProductNotificationItem[] = []
) {
  const user = process.env.SMTP_USER;
  const adminReceiver = process.env.CONTACT_RECEIVER_EMAIL || "reviewsnutritional@gmail.com";
  const dateStr = getFormattedDate();
  const transporter = getTransporter();

  if (!transporter || !user) {
    console.warn(
      `[Nodemailer] SMTP not configured. Simulating subscription welcome email to: ${subscriberEmail}`,
      { productCount: products.length }
    );
    return {
      success: true,
      delivered: false,
      message: "Suscripción registrada (SMTP pendiente).",
    };
  }

  const emailSubject = "¡Bienvenido a NutritionalReviews! Novedades y nuevos productos verificados";
  const welcomeHtml = getSubscriberWelcomeHtml(subscriberEmail, products, dateStr);

  // Deliver welcome & new products email to subscriber
  const info = await transporter.sendMail({
    from: `"NutritionalReviews.org" <${user}>`,
    replyTo: adminReceiver,
    to: subscriberEmail,
    subject: emailSubject,
    text: `¡Bienvenido a NutritionalReviews.org!\n\nTu suscripción ha sido confirmada para ${subscriberEmail}.\n\nA partir de ahora recibirás alertas directas cada vez que publiquemos nuevas reseñas y análisis de productos nutricionales.\n\nVisita nuestro catálogo completo en https://nutritionalreviews.org/products\n\nNutritionalReviews.org — reviewsnutritional@gmail.com`,
    html: welcomeHtml,
  });

  // Notify admin about new subscriber
  try {
    await transporter.sendMail({
      from: `"NutritionalReviews Web" <${user}>`,
      to: adminReceiver,
      subject: `[Nuevo Suscriptor] ${subscriberEmail} se ha unido al boletín`,
      text: `Nuevo suscriptor registrado:\nCorreo: ${subscriberEmail}\nFecha: ${dateStr}\n\nSe le ha enviado automáticamente el correo de bienvenida con los nuevos productos.`,
      html: `<div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #023e8a;">¡Nuevo Suscriptor Registrado!</h2>
        <p><strong>Correo del usuario:</strong> <a href="mailto:${escapeHtml(subscriberEmail)}">${escapeHtml(subscriberEmail)}</a></p>
        <p><strong>Fecha:</strong> ${dateStr}</p>
        <p style="color: #64748b; font-size: 13px;">Se le ha enviado el boletín de bienvenida y la notificación con las últimas reseñas de productos.</p>
      </div>`,
    });
  } catch (adminErr) {
    console.warn("[Nodemailer] Failed to send new subscriber alert to admin:", adminErr);
  }

  return {
    success: true,
    delivered: true,
    messageId: info.messageId,
  };
}

/**
 * Broadcasts a new product notification to all registered subscribers
 * when an admin publishes a new product review.
 */
export async function sendNewProductNotificationToSubscribers(
  product: ProductNotificationItem,
  subscriberEmails: string[]
) {
  if (!subscriberEmails.length) return { sentCount: 0 };

  const user = process.env.SMTP_USER;
  const adminReceiver = process.env.CONTACT_RECEIVER_EMAIL || "reviewsnutritional@gmail.com";
  const dateStr = getFormattedDate();
  const transporter = getTransporter();

  if (!transporter || !user) {
    console.warn(
      `[Nodemailer] SMTP not configured. Would broadcast new product '${product.name}' to ${subscriberEmails.length} subscribers.`
    );
    return { sentCount: 0 };
  }

  const subject = `[Nuevo Producto Analizado] ${product.name} — NutritionalReviews.org`;
  const html = getNewProductBroadcastHtml(product, dateStr);

  let sentCount = 0;
  // Send in batches to avoid SMTP rate limit / spam triggers
  const batchSize = 15;
  for (let i = 0; i < subscriberEmails.length; i += batchSize) {
    const chunk = subscriberEmails.slice(i, i + batchSize);
    await Promise.allSettled(
      chunk.map((toEmail) =>
        transporter
          .sendMail({
            from: `"NutritionalReviews.org" <${user}>`,
            replyTo: adminReceiver,
            to: toEmail,
            subject,
            text: `Nuevo producto analizado en NutritionalReviews: ${product.name}\n\n${product.shortDescription || ""}\n\nLee la reseña completa en: https://nutritionalreviews.org/${product.slug || "products"}`,
            html,
          })
          .then(() => {
            sentCount++;
          })
      )
    );
  }

  return { sentCount };
}
