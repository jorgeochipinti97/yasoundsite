import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    price: { type: Number },
    tags: [{ type: String }],
    genders: [{ type: String }],
    file: {
      fileType: { type: String },
      url: { type: String },
      watermark: { type: String },
    },

    licenses: [
      {
        title: { type: String },
        description: { type: String },
        price: { type: Number, default: 0 },
        priceArs: { type: Number, default: 0 },
      },
    ],
    owner: { type: String },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
