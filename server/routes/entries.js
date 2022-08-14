import express from "express";
import { addEntry, getAllEntries, deleteEntry } from "../controllers/entries.js";

const router = express.Router();

router.post("/add", addEntry);
router.get("/fetch", getAllEntries);
router.delete("/delete", deleteEntry);
export default router;
