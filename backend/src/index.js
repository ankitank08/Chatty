import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import authRoutes from "./routes/auth.rout.js";
import messageRoutes from "./routes/message.rout.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 5000;

dotenv.config();
// console.log("ENV TEST:", {
//   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



console.log("Server is running in " + process.env.NODE_ENV + " mode");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  const indexPath = path.join(
    __dirname,
    "../../frontend",
    "dist",
    "index.html"
  );
  console.log("Production Index HTML Path:", indexPath);
  app.get("*name", (req, res) => {
    res.sendFile(indexPath);
  });
}

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
