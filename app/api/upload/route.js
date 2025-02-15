import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  console.log("🔹 Upload API called!");
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "uploads";
    const fileName = formData.get("fileName") || "untitled";
    let fileType = formData.get("fileType") || "application/octet-stream";

    if (!file) {
      console.log("❌ No file received.");
      return new Response(JSON.stringify({ error: "No file received" }), { status: 400 });
    }

    console.log("📂 Uploading file:", fileName, "to folder:", folder);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uniqueFileName = `${folder}/${uuidv4()}-${fileName}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: fileType,
      ACL: "public-read",
    };

    const parallelUpload = new Upload({
      client: s3,
      params: uploadParams,
    });

    await parallelUpload.done();

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    console.log("✅ File uploaded successfully!");
    console.log("🌍 File URL:", fileUrl);
    console.log("📂 S3 Key:", uniqueFileName);

    return new Response(JSON.stringify({ fileUrl, uploadedKey: uniqueFileName }), { status: 200 });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
