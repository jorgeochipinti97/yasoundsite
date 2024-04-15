import { connectDB } from '@/lib/database';
import Waitlist from '@/models/Waitlist';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();
        // const waitlistUsers = await Waitlist.find({});

        // const results = await Promise.all(waitlistUsers.map(async (waitlistUser) => {
        //     const baseUsername = waitlistUser.nombre.trim().replace(/\s+/g, '');
        //     const newUsername = await generateUniqueUsername(baseUsername);

        //     // Actualizar el usuario en la base de datos de usuarios
        //     const updatedUser = await User.findOneAndUpdate(
        //         { email: waitlistUser.email }, // Localizar por email
        //         { username: newUsername }, // Establecer el nuevo username
        //         { new: true } // Devolver el documento actualizado
        //     );

        //     if (!updatedUser) {
        //         return { message: `No se encontró un usuario con el email ${waitlistUser.email}.` };
        //     }

        //     return updatedUser;
        // }));

        // res.status(200).json({ message: 'Usuarios actualizados correctamente', data: results });
    } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ message: 'Failed to update users', error: error.message });
    }
}

async function generateUniqueUsername(baseUsername) {
    let uniqueUsername = baseUsername;
    let counter = 1;

    while (true) {
        try {
            const existingUser = await User.findOne({ username: uniqueUsername });
            if (!existingUser) {
                return uniqueUsername; // Si no existe, es único
            }
            uniqueUsername = `${baseUsername}${counter}`; // Incrementa si existe
            counter++;
        } catch (error) {
            if (error.code === 11000) { // Captura el error de duplicado
                uniqueUsername = `${baseUsername}${counter}`;
                counter++;
                continue; // Continúa intentando
            }
            throw error; // Re-lanza si es un error diferente
        }
    }
}
