
export default async function handler(req, res) {
  if (req.method === "POST") {

    const { title, quantity, price } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
        },
      ],
      marketplace_fee: 10,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "No se pudo crear la preferencia de pago" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Método no permitido");
  }
}
