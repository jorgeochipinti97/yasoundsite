import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    buyer: { type: String },
    seller: { type: String },
    buyerEmail: { type: String },
    buyerPhone: { type: String },
    buyerCountry: { type: String },
    product: { type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
