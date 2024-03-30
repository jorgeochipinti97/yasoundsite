import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String },
    bio: { type: String },
    phone: { type: String },
    country: { type: String },
    premium: { type: String },
    videos: [{ type: String }],
    colors: [{ type: String }],
    genders: [{ type: String }],
    images: [{ type: String }],
    profilePicture: { type: String, default: "" },
    role: { type: String },
    products: [{ type: String }],
    links: [
      {
        link: { type: String },
        name: { type: String },
      },
    ],
    tokens: {
      access_token: { type: String },
      expires_in: { type: Number },
      public_key: { type: String },
      refresh_token: { type: String },
      token_type: { type: String, default: "Bearer" },
      user_id: { type: Number },
    },
    premium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
