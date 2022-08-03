import express from "express";

import { postUserSignUp } from "../controllers/postUserSignUp.js";

const router = express.Router();

router.post("/sign-up", postUserSignUp);

export default router;
