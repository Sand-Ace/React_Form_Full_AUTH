// package import
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// file import
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"; // This is actually router but we can name it anything since it is an default export

const app = express();
app.use(express.json()); //allows us to parse the incomming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies
dotenv.config();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

// server is listening
app.listen(port, () => {
  connectDB();
  console.log(`Server is listening in the port: ${port}`);
});
