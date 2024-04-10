import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export default async function handler(req, res) {
  // Intenta conectar a la base de datos
  try {
    await connectDB();
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    return res.status(500).json({
      success: false,
      error: "Error interno del servidor al conectar a la base de datos.",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const usuarios = await User.find().sort({ createdAt: 1 });
        return res.status(200).json({ success: true, data: usuarios });
      } catch (error) {
        console.error("Error en GET /api/user:", error);

        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      // Extraer el _id y los campos a actualizar del body de la solicitud
      const { _id, password, ...updateData } = req.body;

      if (!_id) {
        return res.status(400).json({
          success: false,
          error: "El _id es requerido para actualizar.",
        });
      }

      if (password) {
        // Realizar el hash de la nueva contraseña
        const hashedPassword = await hashPassword(password);
        // Incluir la contraseña hasheada en los datos de actualización
        updateData.password = hashedPassword;
      }

      try {
        // Actualizar el documento en MongoDB usando Mongoose
        const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
          new: true, // Esto hace que retorne el documento modificado
        });

        if (!updatedUser) {
          return res
            .status(404)
            .json({ success: false, error: "Usuario no encontrado." });
        }

        return res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        console.error("Error en PUT /api/user:", error);
        return res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      console.warn(`Método no permitido: ${req.method}`);
      res
        .status(405)
        .json({ success: false, error: `Método ${req.method} no permitido` });
      break;
  }
}
