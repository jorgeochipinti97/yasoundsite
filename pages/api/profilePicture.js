import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const config = {
  runtime: "edge",
};

const s3Client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY

  },
});

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const formData = await req.formData();
        const username = formData.get("username");
        const file = formData.get("file");
        const previousFileKey = formData.get("previousFileKey");

        if (previousFileKey) {
          await deletePreviousFile(previousFileKey);
        }

        if (!file) {
          return res.status(400).json({ error: "error" });
        }

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const fileName = `${username}_profilePicture`;
        
        await uploadFileToS3(uint8Array, fileName);
        const fileUrl = `https://yasoundtestbucket.s3.sa-east-1.amazonaws.com/${fileName}`;

        return res.status(200).json({ success: true, fileUrl });
      } catch (error) {
        return res.status(500).json({ error: error });
      }

    default:
      console.warn(`Método no permitido: ${req.method}`);
      res
        .status(405)
        .json({ success: false, error: `Método ${req.method} no permitido` });
      break;
  }
}

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: "yasoundtestbucket",
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "application/octet-stream",
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    return fileName;
  } catch (error) {
    console.error("Error uploading file to S3", error);
    throw error; // Propaga el error para manejarlo en el llamador
  }
}

async function deletePreviousFile(previousFilePath) {
  const deleteParams = {
    Bucket: "yasoundtestbucket",
    Key: previousFilePath, // El 'Key' es el nombre del archivo en el bucket
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log("Archivo anterior eliminado exitosamente.");
  } catch (error) {
    console.error("Error eliminando el archivo anterior:", error);
  }
}
