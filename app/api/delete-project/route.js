import { NextResponse } from "next/server";
import supabase from "../../config/ProjectSphereClient";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function DELETE(req) {
  try {
    const { projectId, s3Keys, supabaseThumbnail } = await req.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // 1️⃣ Delete from MyProjects Table
    const { error: myProjectsError } = await supabase
      .from("MyProjects")
      .delete()
      .eq("p_id", projectId);

    if (myProjectsError) throw new Error(myProjectsError.message);

    // 2️⃣ Delete from ProjectSphere Form Table
    const { error: formError } = await supabase
      .from("ProjectSphere Form")
      .delete()
      .eq("id", projectId);

    if (formError) throw new Error(formError.message);

    // 3️⃣ Delete Thumbnail from Supabase Storage
    if (supabaseThumbnail) {
      const { error: thumbError } = await supabase.storage
        .from("ProjectSphere_Thumbnails")
        .remove([supabaseThumbnail]);

      if (thumbError) throw new Error(thumbError.message);
    }

    // 4️⃣ Delete from AWS S3
    if (s3Keys?.length) {
      for (const s3Key of s3Keys) {
        const deleteParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: s3Key,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
