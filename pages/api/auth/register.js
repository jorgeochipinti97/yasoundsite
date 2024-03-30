import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
    if (req.method === "POST") {
      await register(req, res);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
}

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !email.includes("@") || !password) {
      return;
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(422).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await hashPassword(password);
    
    await User.create({
      email,
      password: hashedPassword,
      username,
    });
  } catch (error) {
    console.log(error.message);
  }
};
