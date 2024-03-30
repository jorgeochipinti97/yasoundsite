const mercadopago = require('mercadopago');


// Configura el SDK con tu Access Token
mercadopago.configure({
  access_token:'APP_USR-4632397606638218-032920-1e901f9cd0ea669a5265c02aeb4193fc-196620874'
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Aquí recoges los datos de tu formulario, por ejemplo
    const { title, quantity, price } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
        },
      ],
      // Configura otros parámetros de la preferencia según necesites
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "No se pudo crear la preferencia de pago" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Método no permitido');
  }
}
