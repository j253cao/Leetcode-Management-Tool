import express from "express";

import {
  fetchUserById,
  postUserSignUp,
  verifyUserLogin,
} from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", postUserSignUp);
router.post("/login", verifyUserLogin);
router.get("/fetch-user", fetchUserById);
export default router;
