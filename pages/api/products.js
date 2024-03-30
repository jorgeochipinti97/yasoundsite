import { connectDB } from "@/lib/database";
import Product from "@/models/Product";

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
        const products = await Product.create(req.body);
        return res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.error("Error en GET /api/product:", error);
      }
      break;
    case "GET":
      try {
        const products = await Product.find().sort({ createdAt: 1 });
        return res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.error("Error en GET /api/product:", error);

        return res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      const { _id, ...updateData } = req.body;

      if (!_id) {
        return res.status(400).json({
          success: false,
          error: "El _id es requerido para actualizar.",
        });
      }

      try {
        // Actualizar el documento en MongoDB usando Mongoose
        const updateProduct = await Product.findByIdAndUpdate(_id, updateData, {
          new: true, // Esto hace que retorne el documento modificado
        });

        if (!updateProduct) {
          return res
            .status(404)
            .json({ success: false, error: "Usuario no encontrado." });
        }

        return res.status(200).json({ success: true, data: updateProduct });
      } catch (error) {
        console.error("Error en PUT /api/product:", error);
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
