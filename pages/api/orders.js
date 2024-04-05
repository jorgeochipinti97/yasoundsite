

import TransactionYasound from "@/models/Transactions";
import { connectDB } from "@/lib/database";

    await connectDB();

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    case "PUT":
      return updateOrder(req, res);
    case "GET":
      return getOrders(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req, res) => {
    await connectDB();
  try {
    const newOrder = new TransactionYasound({ ...req.body});
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }
};



const getOrders = async (req, res) => {
    await connectDB();
  const orders = await TransactionYasound.find().sort({ createdAt: "desc" }).lean();
  return res.status(200).json(orders);
};



const updateOrder = async (req, res) => {
  const { _id } = req.body; // Asegúrate de que esta línea obtiene un _id válido

  if (!_id || _id.length !== 24) { // Verifica si _id es una cadena hex de 24 caracteres
    return res.status(400).json({ message: "El _id proporcionado no es válido" });
  }

  try {
    await connectDB();
    const order = await TransactionYasound.findById(_id);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "No existe un pedido con ese ID" });
    }

    const updatedOrder = await TransactionYasound.findByIdAndUpdate(_id, req.body, { new: true });
    return res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};
