import sgMail from "@sendgrid/mail";
import { connectDB } from "@/lib/database";
import Waitlist from "@/models/Waitlist";
import User from "@/models/User";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const waitlistUsers = await Waitlist.find({});

    const results = await Promise.all(
      waitlistUsers.map(async (waitlistUser) => {
        const user = await User.findOne({ email: waitlistUser.email });
        if (!user) {
          return {
            message: `No hay un usuario creado con el email ${waitlistUser.email}.`,
          };
        }

        const resetPasswordUrl = `https://www.yasound.site/regenerate?id=${user._id}`;
        const imageUrl = "https://www.yasound.site/images/banner.jpeg"; // Reemplaza esto con la URL real de tu imagen
        const msg = {
          to: user.email,
          from: "contacto@yasound.site",
          subject: "Recuperación de Contraseña",
          text: "Aquí puedes escribir instrucciones para establecer la contraseña",
          html: ` <img src="${imageUrl}" alt="Banner" style="width:100%; max-width:600px;">
                <p><strong><a href="${resetPasswordUrl}" target="_blank">Aquí puedes cambiar tu contraseña</a></strong></p>
            `,
        };

        await sgMail.send(msg);
        return { message: `Correo de recuperación enviado a ${user.email}` };
      })
    );

    res
      .status(200)
      .json({ message: "Emails de recuperación enviados", data: results });
  } catch (error) {
    console.error("Error al enviar correos de recuperación:", error);
    res
      .status(500)
      .json({
        message: "Error al procesar la solicitud",
        error: error.message,
      });
  }
}
