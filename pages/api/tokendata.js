// pages/api/token.js
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://api.mercadopago.com/oauth/token', req.body);
      res.status(200).json(response.data);
    } catch (error) {
        console.log(error)
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    // Manejar otros métodos HTTP o retornar error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
