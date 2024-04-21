import { connectDB } from '@/lib/database';
import Product from '@/models/Product';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();
        const beats = await Product.find({});

        // const results = await Promise.allSettled(beats.map(async (beat) => {
        //     try {
        //         // Encuentra el usuario por username almacenado en 'owner'
        //         const user = await User.findOne({ username: beat.owner });
        //         if (!user) {
        //             throw new Error(`No se encontró un usuario con el username ${beat.owner}.`);
        //         }

        //         // Actualizar el 'owner' con el '_id' del usuario encontrado
        //         return await Product.findOneAndUpdate(
        //             { _id: beat._id },
        //             { owner: user._id },
        //             { new: true }
        //         );
        //     } catch (error) {
        //         return { error: error.message, beatId: beat._id };
        //     }
        // }));

        // // Filtrar resultados exitosos y errores para una mejor respuesta
        // const successfulUpdates = results.filter(result => result.status === 'fulfilled').map(r => r.value);
        // const failedUpdates = results.filter(result => result.status === 'rejected').map(r => r.reason);

        // res.status(200).json({
        //     message: 'Proceso completado con resultados de actualizaciones',
        //     successfulUpdates: successfulUpdates,
        //     failedUpdates: failedUpdates
        // });
    } catch (error) {
        console.error('Error during the updating process:', error);
        res.status(500).json({ message: 'Failed to update beats', error: error.message });
    }
}