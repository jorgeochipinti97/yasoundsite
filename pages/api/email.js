// /api/email.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email,  type } = req.body;

  let msg = {
    to: email,
    from: "contacto@yasound.site",
  };

  try {
    switch (type) {
      case "registration":
        msg.subject = "Confirmación de Registro";
        msg.text = "Gracias por registrarte. ¡Bienvenido!";
        msg.html = "<strong>¡Bienvenido a nuestra plataforma!</strong>";
        break;
      case "purchase":
        msg.subject = "Confirmación de Compra";
        msg.text = "Gracias por tu compra.";
        msg.html = "<strong>Gracias por tu compra. Tu pedido está siendo procesado.</strong>";
        break;
      default:
        res.status(400).json({ error: "Tipo de email no especificado o no válido." });
        return;
    }

    await sgMail.send(msg);
    console.log("Correo enviado");
    res.status(200).json({ message: "Correo enviado correctamente." });
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: "Error al enviar el correo." });
  }
}
