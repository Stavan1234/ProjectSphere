import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function deleteS3Objects(keys) {
  await Promise.all(
    keys.map(async (key) => {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
    })
  );
}