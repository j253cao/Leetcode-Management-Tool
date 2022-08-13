import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    problemName: { type: String, required: true },
    difficulty: { type: String, required: true },
    timeTaken: { type: String, required: true },
    dateCompleted: { type: String, required: true },
    ownerId: { type: String, required: true },
    topics: { type: String, required: false },
  },
  {
    collection: "item-entries",
    timestamps: true,
  },
);

export const Entry = mongoose.model("entryData", entrySchema);
