// pages/api/sendEmail.js
import brevo from "@getbrevo/brevo";

export default async function sendEmail(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { subject, clientEmail, clientName, content, typeOfEmail } = req.body;

  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  const smtpEmail = new brevo.SendSmtpEmail();
  smtpEmail.subject = subject;
  smtpEmail.to = [{ email: clientEmail, name: clientName }];
  smtpEmail.htmlContent = generateEmailContent(typeOfEmail, content);
  smtpEmail.sender = {
    name: process.env.COMPANY_NAME,
    email: process.env.COMPANY_EMAIL,
  };

  try {
    await apiInstance.sendTransacEmail(smtpEmail);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    res.status(500).json({ message: "Error al enviar el correo", error: error.message });
  }
}

function generateEmailContent(typeOfEmail, content) {
  switch (typeOfEmail) {
    case "routine":
      return `<html><body><h1>${content}</h1></body></html>`;
    case "reminder":
      return `<html><body><h1>${content}</h1></body></html>`;
    default:
      throw new Error("Tipo de correo no válido");
  }
}