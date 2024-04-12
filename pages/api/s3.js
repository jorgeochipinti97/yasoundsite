// Importación de dependencias necesarias
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const config = {
  runtime: "edge", // Especifica que se utiliza en entornos como Vercel Edge Functions
};

// Inicializa el cliente S3 con configuración segura
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Manejador de la función API
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        // Parsea el formData para obtener los datos del archivo y otros campos
        const formData = await req.formData();
        const username = formData.get("username");
        const file = formData.get("file");

        if (!file) {
          return new Response(JSON.stringify({ error: "File is required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Preparación del archivo para subida
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const originalName = file.name;

        const extension = originalName.split(".").pop();

        const fileName = `${username}-${Date.now()}.${extension}`;
        const mimeType = file.type;

        const fileUrl = `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/${fileName}`;

        const command = new PutObjectCommand({
          Bucket: "yasoundtestbucket",
          Key: fileName,
          Body: uint8Array,
          ContentType: mimeType,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        
        return new Response(JSON.stringify({ success: true, url,fileUrl }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
        // Subida del archivo a S3
        // await uploadFileToS3(uint8Array, fileName, mimeType);
      } catch (error) {
        // Manejo de errores
        return new Response(JSON.stringify({ error: error.toString() }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      break;
    case "PUT":
      try {
        const data = await req.json(); // Esto es correcto para Edge Functions.
        const { fileName } = data;
        if (!fileName) {
          return new Response(JSON.stringify({ error: "No hay filename." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        console.log(fileName);
        // Llamada a la función para eliminar el archivo de S3.
        await deleteFileFromS3(fileName);
        // Respuesta exitosa.
        return new Response(
          JSON.stringify({ message: "Imagen eliminada exitosamente." }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        console.error("Error deleting image:", error);
        return new Response(
          JSON.stringify({ error: "Failed to delete image." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      break;
    default:
      return new Response(
        JSON.stringify({ error: `Method ${req.method} not allowed` }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" },
        }
      );
      break;
  }
}

async function deleteFileFromS3(fileName) {
  const command = new DeleteObjectCommand({
    Bucket: "yasoundtestbucket",
    Key: fileName,
  });

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function uploadFileToS3(fileBuffer, fileName, mimeType) {
  const params = {
    Bucket: "yasoundtestbucket",
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType, // Ajusta según el tipo de archivo real
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileName;
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw error; // Propaga el error para manejarlo en el llamador
  }
}
