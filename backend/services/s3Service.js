import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import s3Client from "../config/s3Client.js";

export const uploadFile = async (fileBuffer, originalFileName, fileType) => {
  const uniqueFileName = `${uuidv4()}-${originalFileName}`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: uniqueFileName,
    Body: fileBuffer,
    Expires: 3600, 
    ContentType: fileType,
  };

  await s3Client.send(new PutObjectCommand(params));
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`;
};