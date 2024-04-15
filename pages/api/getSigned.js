// Importación de dependencias necesarias
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
      console.log(req.body); 

      const { fileName, fileType } = req.body;

      const command = new PutObjectCommand({
        Bucket: "yasoundtestbucket",
        Key: fileName,
        ContentType: fileType, 
      });

      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, 
      });

      res.status(200).json({ success: true, url });
    } catch (error) {
      res.status(500).json({ error });

    }
  }
}
