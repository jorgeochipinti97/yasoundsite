
import { connectDB } from "@/lib/database";
import Waitlist from "@/models/Waitlist";

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
    case "POST":
      try {
        const usuario = await Waitlist.create(req.body);
        res.status(200).json({ success: true, data: usuario });
      } catch (error) {
        console.error("Error en POST /api/user:", error);

        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "GET":
      try {
        // Busca todos los usuarios y los devuelve
        const usuarios = await Waitlist.find().sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: usuarios });
      } catch (error) {
        console.error("Error en GET /api/user:", error);
        // Devuelve un mensaje de error más informativo
        res.status(400).json({ success: false, error: error.message });
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
