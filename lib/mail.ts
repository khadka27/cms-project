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

export async function sendContactEmail(payload: ContactEmailPayload) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || "reviewsnutritional@gmail.com";

  if (!user || !pass) {
    console.warn(
      "[Nodemailer] SMTP_USER or SMTP_PASS not set. Logging email payload to console instead of sending:",
      payload
    );
    return {
      success: true,
      delivered: false,
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
  const subjectLine = `[NutritionalReviews] ${topicPrefix}${payload.subject || "Nuevo mensaje de contacto"}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #023e8a, #0077b6); padding: 20px 24px; border-radius: 12px; color: #ffffff; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">Nuevo Mensaje de Contacto</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #d4eff7; opacity: 0.9;">NutritionalReviews.org — Portal de Salud y Bienestar</p>
      </div>

      <div style="padding: 0 4px; font-size: 14px; color: #334155;">
        <p style="margin: 8px 0;"><strong>Remitente:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin: 8px 0;"><strong>Correo Electrónico:</strong> <a href="mailto:${escapeHtml(payload.email)}" style="color: #0077b6; font-weight: 600;">${escapeHtml(payload.email)}</a></p>
        ${payload.topic ? `<p style="margin: 8px 0;"><strong>Motivo:</strong> <span style="background-color: #d4eff7; color: #023e8a; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 12px;">${escapeHtml(payload.topic)}</span></p>` : ""}
        ${payload.subject ? `<p style="margin: 8px 0;"><strong>Asunto:</strong> ${escapeHtml(payload.subject)}</p>` : ""}
      </div>

      <div style="margin-top: 24px; padding: 18px 20px; background-color: #f8fafc; border-left: 4px solid #0077b6; border-radius: 8px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700;">Mensaje:</h3>
        <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #1e293b; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
        Recibido desde el formulario oficial de NutritionalReviews.org el ${new Date().toLocaleString("es-ES")}.
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"${payload.name}" <${user}>`,
    replyTo: payload.email,
    to: receiver,
    subject: subjectLine,
    text: `Nuevo mensaje de ${payload.name} (${payload.email})\nMotivo: ${payload.topic || "General"}\nAsunto: ${payload.subject || "Sin asunto"}\n\nMensaje:\n${payload.message}`,
    html: htmlContent,
  });

  return { success: true, delivered: true, messageId: info.messageId };
}

