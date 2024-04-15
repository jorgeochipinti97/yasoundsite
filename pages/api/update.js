import { connectDB } from '@/lib/database';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        // Restringe el método a POST para evitar cambios no deseados
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Actualizar todos los usuarios para que sean premium
        // const updateResult = await User.updateMany({}, { $set: { premium: true } });

        // Responder con el resultado de la actualización
        res.status(200).json({ message: 'Todos los usuarios han sido actualizados a premium.', data: updateResult });
    } catch (error) {
        console.error('Error updating users to premium:', error);
        res.status(500).json({ message: 'Failed to update users to premium', error: error.message });
    }
}
