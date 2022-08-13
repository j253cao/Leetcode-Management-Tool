import express from "express";
import { addEntry, getAllEntries } from "../controllers/entries.js";

const router = express.Router();

router.post("/add", addEntry);
router.get("/fetch", getAllEntries);
export default router;
