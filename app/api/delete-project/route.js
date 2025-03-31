import { NextResponse } from "next/server";
import supabase from "../../config/ProjectSphereClient";
import { deleteS3Objects } from "@/utils/s3";

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

    if (myProjectsError) console.error("Error deleting from MyProjects:", myProjectsError.message);

    // 2️⃣ Delete from ProjectSphere Form Table
    const { error: formError } = await supabase
      .from("ProjectSphere Form")
      .delete()
      .eq("id", projectId);

    if (formError) console.error("Error deleting from ProjectSphere Form:", formError.message);

    // 3️⃣ Delete Thumbnail from Supabase Storage
    if (supabaseThumbnail) {
      const { error: thumbError } = await supabase.storage
        .from("ProjectSphere_Thumbnails")
        .remove([supabaseThumbnail]);

      if (thumbError) console.error("Error deleting thumbnail:", thumbError.message);
    }

    // 4️⃣ Delete from AWS S3
    if (s3Keys?.length) {
      await deleteS3Objects(s3Keys);
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}