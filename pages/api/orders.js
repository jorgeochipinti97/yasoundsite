

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
  const { _id = "" } = req.body;

  try {
    await connectDB();
    const order = await TransactionYasound.findById(_id);
    console.log(order);
    if (!order) {
      return res
        .status(400)
        .json({ message: "No existe un producto con ese ID" });
    }
    await TransactionYasound.findOneAndUpdate({ _id: _id }, req.body);

    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Revisar la consola del servidor" });
  }
};
