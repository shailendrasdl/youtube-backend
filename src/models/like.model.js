import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({}, { timestamps: true });

export const Like = mongoose.model("Like", likeSchema);
