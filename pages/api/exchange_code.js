// pages/api/exchange_code.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { code, redirectUri } = req.body;
  
      try {
        const response = await fetch(`https://api.mercadopago.com/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.MP_CLIENT_ID,
            client_secret: process.env.MP_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://yasound.site/oauth',
          }),
        });
  
        const data = await response.json();
        // Aquí debes guardar el access_token y el refresh_token de manera segura (ejemplo: en tu base de datos)
        
        return res.status(200).json({ access_token: data.access_token, refresh_token: data.refresh_token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error del servidor al intercambiar el código' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  