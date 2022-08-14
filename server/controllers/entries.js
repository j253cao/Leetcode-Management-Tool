import { Entry } from "../models/entry.model.js";

export const addEntry = async (req, res) => {
  const { status, problemName, difficulty, timeTaken, dateCompleted } = req.body;
  if (status !== "Completed" && status !== "Attempted" && status !== "To-Do")
    return res.status(400).json({ message: "Please choose a status" });
  if (!problemName) return res.status(400).json({ message: "Please enter a name" });
  if (difficulty !== "Easy" && difficulty !== "Medium" && difficulty !== "Hard")
    return res.status(400).json({ message: "Please choose a difficulty" });
  if (!timeTaken) return res.status(400).json({ message: "Please enter the time it took" });
  if (!dateCompleted) return res.status(400).json({ message: "Please choose a date" });
  try {
    const item = await Entry.create(req.body);
    return res.status(200).json({ item });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllEntries = async (req, res) => {
  const { ownerId } = req.body;
  try {
    const response = await Entry.find(ownerId);
    if (!response) return res.status(400).json({ message: "Invalid owner id" });
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteEntry = async (req, res) => {
  const { _id } = req.body;
  try {
    const response = await Entry.findByIdAndDelete(_id);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
