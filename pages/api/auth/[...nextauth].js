// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";

import bcrypt from "bcryptjs";
import User from "@/models/User"; // Ajusta la importación del modelo de usuario según tu estructura
import { connectDB } from "@/lib/database";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB(); // Asegura la conexión a la base de datos

        // Verifica si los credentials tienen el campo email o username y procede según corresponda
        const { email, username, password } = credentials;

        // Encuentra al usuario por correo electrónico o nombre de usuario
        const userFound = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (!userFound) {
          throw new Error("No se encontró al usuario");
        }

        // Compara la contraseña proporcionada con la hash almacenada
        const matchPassword = await bcrypt.compare(password, userFound.password);
        if (!matchPassword) {
          throw new Error("Contraseña incorrecta");
        }

        // Retorna el perfil del usuario para ser utilizado en la sesión
        return {
          id: userFound._id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Asegúrate de que esta ruta corresponde a tu página personalizada de inicio de sesión
  },
  // Otras configuraciones que puedas necesitar...
});
