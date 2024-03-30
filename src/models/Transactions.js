import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    buyer: { type: String, required: true },
    seller: { type: String, required: true },
    product: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
