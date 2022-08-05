import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

const mongoDBUri = process.env.MONGOOSE_URI;
mongoose.connect(mongoDBUri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

// app.use("/profiles", profilesRouter); mongo CRUD for stocks schema

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
