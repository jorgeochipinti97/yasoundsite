// Importación de dependencias necesarias
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configuración de la API para funcionar con Vercel Edge Functions

const s3Client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body); // Para depuración, para ver lo que realmente recibes

      const { fileName, fileType } = req.body;

      const command = new PutObjectCommand({
        Bucket: "yasoundtestbucket",
        Key: fileName,
        ContentType: fileType, // Ajusta esto según la lógica necesaria para definir el tipo de contenido
      });

      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, // Tiempo de expiración de la URL en segundos
      });

      res.status(200).json({ success: true, url });
    } catch (error) {
      res.status(500).json({ error });
      //   return new Response(JSON.stringify({ error: error.toString() }), {
      //     status: 500,
      //     headers: { "Content-Type": "application/json" },
      //   });
    }
  }
}
