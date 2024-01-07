import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({}, { timestamps: true });

export const playlist = mongoose.model("playlist", playlistSchema);
