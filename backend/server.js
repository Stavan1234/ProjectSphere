import express from "express";
import cors from "cors";
import multer from "multer";
import uploadRouter from "./routes/upload.js";

const app = express();
const upload = multer();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// File upload middleware (applied only to upload route)
app.use("/api/upload", upload.any());

// Routes
app.use("/api", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));