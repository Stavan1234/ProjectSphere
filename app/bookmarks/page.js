"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import supabase from "../config/ProjectSphereClient";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import Header from "../components/Header";


const supabase2 = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

export default function Bookmarks() {
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookmarkedProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Get current user
        const { data: { user }, error: userError } = await supabase2.auth.getUser();
        
        if (userError || !user) {
          setError(userError?.message || "Please login to view bookmarks");
          setLoading(false);
          return;
        }

        // 2. Fetch user's bookmarks
        const { data: bookmarks, error: bookmarksError } = await supabase
          .from("Bookmarks")
          .select("project_id")
          .eq("user_email", user.email);

        if (bookmarksError) {
          throw bookmarksError;
        }

        if (!bookmarks || bookmarks.length === 0) {
          setBookmarkedProjects([]);
          setLoading(false);
          return;
        }

        // 3. Get project details for bookmarked projects
        const projectIds = bookmarks.map((b) => b.project_id);
        const { data: projects, error: projectsError } = await supabase
          .from("ProjectSphere Form")
          .select("id, Project_Title, Thumbnail_URL, Project_Text_area")
          .in("id", projectIds);

        if (projectsError) {
          throw projectsError;
        }

        setBookmarkedProjects(projects || []);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setError(err.message || "Failed to load bookmarks");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedProjects();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto pt-20 py-6">
          <p className="text-gray-500 text-center">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto pt-20 py-6">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto pt-20 py-6">
        <h2 className="text-2xl text-center font-bold mb-4">Bookmarked Projects</h2>

        {bookmarkedProjects.length > 0 ? (
          <div className="space-y-4">
            {bookmarkedProjects.map((project) => (
              <Card
                key={project.id}
                isPressable
                onPress={() => router.push(`/project_page/${project.id}`)}
                className="relative flex flex-row bg-transparent shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <CardHeader className="w-1/3 p-0">
                  <Image
                    src={project.Thumbnail_URL || "/placeholder.jpg"}
                    alt={project.Project_Title}
                    className="object-cover w-full h-[180px] rounded-l-lg"
                  />
                </CardHeader>
                <CardBody className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-blue-950 truncate">
                    {project.Project_Title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.Project_Text_area || "No description available"}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No bookmarks yet.</p>
        )}
      </div>
    </div>
  );
}