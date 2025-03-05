import express from "express";
import { uploadFile } from "../services/s3Service.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedUrls = await Promise.all(
      req.files.map(async (file) => {
        return uploadFile(
          file.buffer,
          file.originalname,
          file.mimetype
        );
      })
    );

    res.json({ uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;