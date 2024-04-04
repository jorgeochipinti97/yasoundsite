import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    buyer: { type: String },
    seller: { type: String },
    buyerEmail: { type: String },
    buyerPhone: { type: String },
    buyerCountry: { type: String },
    product: { type: String },
    transactionId: { type: String },
    token: { type: String },
    status: { type: String },
    fileUrl:{ type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

const TransactionYasound =
  mongoose.models.TransactionYasound ||
  mongoose.model("TransactionYasound", transactionSchema);

export default TransactionYasound;
