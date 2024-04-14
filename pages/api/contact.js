import { connectDB } from "@/lib/database";
import Contact from "@/models/Contact";

export default async function handler(req, res) {
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
      onPost(req, res);
      break;
    case "GET":
      onGet(req, res);
      break;
  }
}

const onGet = async (req, res) => {
  try {
    const contact = await Contact.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error en GET /api/product:", error);

    return res.status(400).json({ success: false, error: error.message });
  }
};

const onPost = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error en GET /api/product:", error);
  }
};
