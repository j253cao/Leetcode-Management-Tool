import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import entriesRoutes from "./routes/entries.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/entries", entriesRoutes);

const mongoDBUri = process.env.MONGOOSE_URI;
mongoose.connect(mongoDBUri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
