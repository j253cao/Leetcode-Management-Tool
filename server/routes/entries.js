import express from "express";
import { addEntry } from "../controllers/entries.js";

const router = express.Router();

router.post("/add", addEntry);

export default router;
