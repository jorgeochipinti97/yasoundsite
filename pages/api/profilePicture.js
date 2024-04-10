// import {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
// } from "@aws-sdk/client-s3";

// const s3Client = new S3Client({
//   region: "sa-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY

//   },
// });

// export default async function handler(req, res) {
//   switch (req.method) {
//     case "POST":
//       try {
//         const formData = await req.formData();
//         const username = formData.get("username");
//         const file = formData.get("file");
//         const previousFileKey = formData.get("previousFileKey");

//         if (previousFileKey) {
//           await deletePreviousFile(previousFileKey);
//         }

//         if (!file) {
//           return res.status(400).json({ error: "error" });
//         }

//         const arrayBuffer = await file.arrayBuffer();
//         const uint8Array = new Uint8Array(arrayBuffer);
//         const fileName = `${username}_profilePicture`;

//         await uploadFileToS3(uint8Array, fileName);
//         const fileUrl = `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/${fileName}`;

//         return res.status(200).json({ success: true, fileUrl });
//       } catch (error) {
//         return res.status(500).json({ error: error });
//       }

//     default:
//       console.warn(`Método no permitido: ${req.method}`);
//       res
//         .status(405)
//         .json({ success: false, error: `Método ${req.method} no permitido` });
//       break;
//   }
// }

// async function uploadFileToS3(file, fileName) {
//   const fileBuffer = file;
//   console.log(fileName);

//   const params = {
//     Bucket: "yasoundtestbucket",
//     Key: `${fileName}`,
//     Body: fileBuffer,
//     ContentType: "application/octet-stream",
//   };

//   const command = new PutObjectCommand(params);

//   try {
//     await s3Client.send(command);
//     return fileName;
//   } catch (error) {
//     console.error("Error uploading file to S3", error);
//     throw error; // Propaga el error para manejarlo en el llamador
//   }
// }

// async function deletePreviousFile(previousFilePath) {
//   const deleteParams = {
//     Bucket: "yasoundtestbucket",
//     Key: previousFilePath, // El 'Key' es el nombre del archivo en el bucket
//   };

//   try {
//     await s3Client.send(new DeleteObjectCommand(deleteParams));
//     console.log("Archivo anterior eliminado exitosamente.");
//   } catch (error) {
//     console.error("Error eliminando el archivo anterior:", error);
//   }
// }

// Importación de dependencias necesarias
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const config = {
  runtime: "edge", // Especifica que se utiliza en entornos como Vercel Edge Functions
};

// Inicializa el cliente S3 con configuración segura
const s3Client = new S3Client({
  region: "sa-east-1",
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

        // Validación básica del archivo
        if (!file) {
          return new Response(JSON.stringify({ error: "File is required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Preparación del archivo para subida
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const fileName = `${username}`;

        // Subida del archivo a S3
        await uploadFileToS3(uint8Array, fileName);

        const fileUrl = `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/${fileName}`;

        return new Response(JSON.stringify({ success: true, fileUrl }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        // Manejo de errores
        return new Response(JSON.stringify({ error: error.toString() }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
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

        await deleteFileFromS3(fileName);

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

async function uploadFileToS3(fileBuffer, fileName) {
  const params = {
    Bucket: "yasoundtestbucket",
    Key: fileName,
    Body: fileBuffer,
    ContentType: "application/octet-stream", // Ajusta según el tipo de archivo real
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileName;
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw error; // Propaga el error para manejarlo en el llamador
  }
}
