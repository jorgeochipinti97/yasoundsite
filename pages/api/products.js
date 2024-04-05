import { connectDB } from "@/lib/database";
import Product from "@/models/Product";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
    case "PUT":
      onPut(req, res);
      break;
    case "DELETE":
      onDelete(req, res);
      break;
    default:
      console.warn(`Método no permitido: ${req.method}`);
      res
        .status(405)
        .json({ success: false, error: `Método ${req.method} no permitido` });
      break;
  }
}

const onGet = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error en GET /api/product:", error);

    return res.status(400).json({ success: false, error: error.message });
  }
};
const onDelete = async (req, res) => {
  const { _id } = req.query; // Asumiendo que el ID viene en la query de la URL

  if (!_id) {
    return res.status(400).json({
      success: false,
      error: "El _id es requerido para eliminar.",
    });
  }

  try {
    // Obtener el producto para acceder a la información de la imagen/archivo
    const productToDelete = await Product.findById(_id);
    if (!productToDelete) {
      return res
        .status(404)
        .json({ success: false, error: "Producto no encontrado." });
    }

    const getKeyFromUrl = (url) => {
      const bucketUrl = `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/`;
      return url.replace(bucketUrl, "");
    };

    const imageKey = getKeyFromUrl(productToDelete.image);
    const licenseKey = getKeyFromUrl(productToDelete.file.url);

    await deleteS3Object(process.env.AWS_S3_BUCKET_NAME, imageKey);
    await deleteS3Object(process.env.AWS_S3_BUCKET_NAME, licenseKey);


    await Product.deleteOne({ _id: _id });

    return res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente.",
    });
  } catch (error) {
    console.error("Error en DELETE /api/product:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

const onPut = async (req, res) => {
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
};

const deleteS3Object = async (bucketName, objectKey) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });
    const response = await s3Client.send(deleteCommand);
    console.log("S3 Delete response", response);
    return true;
  } catch (error) {
    console.error("Error deleting S3 object:", error);
    return false;
  }
};

const onPost = async (req, res) => {
  try {
    const products = await Product.create(req.body);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error en GET /api/product:", error);
  }
};
