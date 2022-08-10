import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    status: { type: String, required: true, unique: true },
    problemName: { type: String, required: true },
    difficulty: { type: String, required: true },
    timeTaken: { type: String, required: true },
    dateCompleted: { type: Date, required: true },
    owenerId: { type: String, required: true },
  },
  {
    collection: "problem-entries",
    timestamps: true,
  },
);

export const Entry = mongoose.model("entryData", entrySchema);
