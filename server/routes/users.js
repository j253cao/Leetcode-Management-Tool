import express from "express";

import {
  existingUserLogin,
  fetchUserById,
  postUserSignUp,
  verifyUserLogin,
} from "../controllers/users.js";

const router = express.Router();

router.post("/sign-up", postUserSignUp);
router.post("/login", verifyUserLogin);
router.post("/existing-login", existingUserLogin);
router.get("/fetch-user", fetchUserById);
export default router;
