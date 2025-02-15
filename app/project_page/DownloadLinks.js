"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Ensure correct usage of useParams
import supabase from "../config/ProjectSphereClient";

const DownloadLinks = () => {
  const { id } = useParams();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!id) return; // Ensure ID is available

      const { data, error } = await supabase
        .from("ProjectSphere Form")
        .select("file_url") // Fetch file URLs
        .eq("id", id) // Ensure correct ID field
        .single();

      if (error) {
        console.error("Error fetching files:", error);
      } else {
        console.log("Fetched Data:", data); // Debugging output

        // Ensure file_url is an array and filter out empty "{}" values
        setDocs(
          Array.isArray(data?.file_url) ? data.file_url.filter(url => url && url !== "{}") : []
        );
      }
    };

    fetchDocuments();
  }, [id]);

  return (
    <div className="items-center space-y-3 mt-6">
      {docs.length > 0 ? (
        docs.map((fileUrl, index) => {
          // Extract file name from URL
          const fileName = fileUrl.split("/").pop();

          return (
            <div key={index} className="flex items-center gap-4">
              <a
                href={fileUrl}
                download
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Download
              </a>
              <span className="text-lg text-gray-700">{fileName}</span>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No downloadable files available.</p>
      )}
    </div>
  );
};

export default DownloadLinks;
