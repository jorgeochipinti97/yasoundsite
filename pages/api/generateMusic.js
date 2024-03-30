// pages/api/generateMusic.js
import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Configura el cliente de Replicate con tu token de API
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    try {
      // Extrae el prompt del cuerpo de la solicitud
      const { prompt } = req.body;

      // Ejecuta el modelo de Replicate con el prompt proporcionado
      const output = await replicate.run(
        "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        {
          input: {
            top_k: 250,
            top_p: 0,
            prompt: prompt,
            duration: 5,
            temperature: 1,
            continuation: false,
            model_version: "stereo-large",
            output_format: "wav",
            continuation_start: 0,
            multi_band_diffusion: false,
            normalization_strategy: "peak",
            classifier_free_guidance: 3,
          },
        }
      );
      console.log(output);

      // Envía la salida del modelo al cliente
      return res.status(200).json(output);
    } catch (error) {
      console.error("Error al generar la música:", error);
      return res
        .status(500)
        .json({ message: "Error al conectar con Replicate" });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
