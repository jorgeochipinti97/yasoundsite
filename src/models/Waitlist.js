import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    rol: { type: String, required: true },
    celular: { type: String, required: true },
  },
  { timestamps: true }
);

const Waitlist =
  mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;
