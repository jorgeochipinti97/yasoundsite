// Importa la biblioteca de SendGrid
const sgMail = require("@sendgrid/mail");

// Configura la API Key de SendGrid
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(
  "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"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, _id } = req.body; // Asume que el correo del usuario viene en el cuerpo de la solicitud

    const resetPasswordUrl = `https://www.yasound.site/regenerate?id=${_id}`;
    // const resetPasswordUrl = `https://www.yasound.site/regenerate?id=65e98eebfb36a778c7fab822`;

    const msg = {
      to: `${email}`, // El correo del destinatario, obtenido de la solicitud
      from: "contacto@yasound.site", // Cambia esto por tu correo verificado en SendGrid
      subject: "Recuperación de Contraseña",
      text: "Aquí puedes escribir instrucciones para restablecer la contraseña",
      html: `<strong><a href="${resetPasswordUrl}" target="_blank">Aquí puedes restablecer tu contraseña</a></strong>`,
    };

    try {
      await sgMail.send(msg);
      console.log("Correo enviado");
      res.status(200).json({ message: "Correo de recuperación enviado." });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      res
        .status(500)
        .json({ error: "Error al enviar el correo de recuperación." });
    }
  } else {
    // Método HTTP no permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
