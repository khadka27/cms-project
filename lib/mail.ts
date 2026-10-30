import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject?: string;
  topic?: string;
  message: string;
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

      <!-- Message Container -->
      <div style="margin-bottom: 26px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 8px;">
          Mensaje Recibido:
        </div>
        <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #0077b6; border-radius: 8px; padding: 18px 20px; font-size: 14px; line-height: 1.7; color: #1e293b; white-space: pre-wrap;">${safeMessage}</div>
      </div>

      <!-- Quick Action Button -->
      <div style="text-align: center; margin: 24px 0 10px 0;">
        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(payload.subject || "Su mensaje a NutritionalReviews.org")}" style="display: inline-block; background: #023e8a; color: #ffffff; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(2, 62, 138, 0.25);">
          Responder directamente a ${safeName} &rarr;
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 11px; color: #94a3b8; text-align: center;">
      Formulario de contacto oficial de <a href="https://nutritionalreviews.org" style="color: #64748b; text-decoration: underline;">NutritionalReviews.org</a>.
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
  <title>Hemos recibido tu mensaje — NutritionalReviews.org</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #eef8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(2, 62, 138, 0.08); border: 1px solid #d4eff7;">
    
    <!-- Top Brand Header -->
    <div style="background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%); padding: 36px 32px 30px 32px; color: #ffffff; text-align: center;">
      <div style="display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.25); padding: 4px 14px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #d4eff7; margin-bottom: 14px;">
        NutritionalReviews.org
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; color: #ffffff; line-height: 1.25;">
        ¡Gracias por contactarnos, ${safeName}!
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #d4eff7; opacity: 0.95;">
        Hemos recibido tu mensaje correctamente
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 28px 32px;">
      
      <!-- Estimated Response Time Banner (2 to 3 Business Days) -->
      <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 14px; padding: 18px 20px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 32px; vertical-align: top; padding-right: 12px;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #22c55e; color: #ffffff; text-align: center; line-height: 28px; font-size: 16px; font-weight: 900;">
                &#10003;
              </div>
            </td>
            <td>
              <p style="margin: 0; font-size: 14px; font-weight: 800; color: #166534;">
                Recibirás respuesta en un plazo de 2 a 3 días hábiles
              </p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #15803d; line-height: 1.5;">
                Nuestro equipo editorial revisa cada mensaje detenidamente. Te responderemos directamente a este correo con la información solicitada.
              </p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Greeting & Intro -->
      <p style="font-size: 14px; line-height: 1.65; color: #334155; margin: 0 0 16px 0;">
        Hola <strong>${safeName}</strong>,
      </p>
      <p style="font-size: 14px; line-height: 1.65; color: #334155; margin: 0 0 22px 0;">
        Muchas gracias por escribirnos. En <strong>NutritionalReviews.org</strong> nos dedicamos a ofrecer reseñas transparentes y verificadas de suplementos nutricionales para lectores de América Latina, contrastando ingredientes según etiqueta, promesas comerciales y evidencia disponible.
      </p>

      <!-- Submitted Message Summary Box -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 26px;">
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 12px;">
          Copia de tu consulta enviada (${dateStr}):
        </div>
        <p style="margin: 5px 0; font-size: 13px;"><strong>Motivo:</strong> <span style="color: #023e8a; font-weight: 700;">${safeTopic}</span></p>
        <p style="margin: 5px 0; font-size: 13px;"><strong>Asunto:</strong> ${safeSubject}</p>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
          <strong style="font-size: 12px; color: #475569; display: block; margin-bottom: 4px;">Mensaje:</strong>
          <div style="font-size: 13px; line-height: 1.65; color: #334155; white-space: pre-wrap; font-style: italic;">${safeMessage}</div>
        </div>
      </div>

      <!-- Exploration Section -->
      <div style="background-color: #f0f9fb; border: 1px solid #d4eff7; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #023e8a;">
          Mientras preparamos tu respuesta:
        </h3>
        <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #334155;">
          <li><a href="https://nutritionalreviews.org/products" style="color: #0077b6; font-weight: 600; text-decoration: none;">Explorar reseñas y comparativas de suplementos &rarr;</a></li>
          <li><a href="https://nutritionalreviews.org/quienes-somos" style="color: #0077b6; font-weight: 600; text-decoration: none;">Conocer nuestro criterio editorial &rarr;</a></li>
          <li><a href="https://nutritionalreviews.org/legal/affiliate" style="color: #0077b6; font-weight: 600; text-decoration: none;">Transparencia y divulgación de afiliados &rarr;</a></li>
        </ul>
      </div>

      <!-- Health Disclaimer Reminder -->
      <p style="font-size: 11px; line-height: 1.6; color: #64748b; margin: 0; padding-top: 12px; border-top: 1px solid #f1f5f9;">
        <em>Nota de salud:</em> NutritionalReviews.org no vende productos directamente ni ofrece consejos médicos personalizados. Si tienes dudas de salud, consulta siempre a un profesional sanitario cualificado.
      </p>

    </div>

    <!-- Sign-off & Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center;">
      <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">
        Equipo Editorial de NutritionalReviews.org
      </p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">
        Contacto directo: <a href="mailto:reviewsnutritional@gmail.com" style="color: #0077b6; text-decoration: none;">reviewsnutritional@gmail.com</a> · <a href="https://nutritionalreviews.org" style="color: #0077b6; text-decoration: none;">https://nutritionalreviews.org</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "reviewsnutritional@gmail.com";
  const dateStr = getFormattedDate();

  if (!user || !pass) {
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

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

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
