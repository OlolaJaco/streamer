import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true },
        image: String,
    },
    { timestamps: true }
);

// Check if model already exists before creating it
export default (mongoose.models && mongoose.models.User) || mongoose.model("User", UserSchema);