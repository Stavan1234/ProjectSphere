"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import supabase from "../config/ProjectSphereClient";
import Header from "../components/Header";
import { createClient } from "@supabase/supabase-js";
import DeleteProject from "./DeleteProject";

const supabase2 = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

export default function WebDevProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserProjects = async () => {
      setLoading(true);

      // Fetch logged-in user details
      const { data: { user }, error: userError } = await supabase2.auth.getUser();

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      setUserEmail(user.email);

      try {
        // Fetch projects linked to the user's email
        const { data, error } = await supabase
          .from("MyProjects")
          .select("p_id")
          .eq("Email", user.email);

        if (error) {
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          setProjects([]); // No projects found
          setLoading(false);
          return;
        }

        const projectIds = data.map((item) => item.p_id);

        // Fetch project details from ProjectSphere Form using the project IDs
        const { data: projectsData, error: projectsError } = await supabase
          .from("ProjectSphere Form")
          .select("id, Project_Title, Thumbnail_URL, Project_Text_area")
          .in("id", projectIds)
          .order("id", { ascending: false });

        if (projectsError) {
          throw new Error(projectsError.message);
        }

        setProjects(projectsData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, []);

  const handleProjectClick = (id) => {
    router.push(`/project_page/${id}`);
  };

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto pt-20 py-6">
        <h2 className="text-2xl text-center font-bold mb-4">My Projects</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>Error: {error}</p>
          </div>
        )}

        <div className="space-y-4 overflow-y-auto max-h-[80vh] scrollbar-hide">
          {loading ? (
            <p className="text-gray-500 text-center">Loading projects...</p>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              // ✅ Wrap in a parent `<div>` to fix JSX syntax
              <div key={project.id}>
                <Card
                  isPressable
                  onPress={() => handleProjectClick(project.id)}
                  className="relative flex flex-row bg-transparent shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  {/* Left: Thumbnail */}
                  <CardHeader className="w-1/3 p-0">
                    <Image
                      src={project.Thumbnail_URL || "/placeholder.jpg"}
                      alt={project.Project_Title || "Untitled Project"}
                      className="object-cover w-full h-[180px] rounded-l-lg"
                    />
                  </CardHeader>

                  {/* Right: Project Info */}
                  <CardBody className="flex-1 p-4">
                    <h3 className="text-lg font-semibold text-blue-950 truncate">
                      {project.Project_Title || "Untitled Project"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.Project_Text_area || "No description available."}
                    </p>
                  </CardBody>
                </Card>

                {/* Delete Button Below */}
                <DeleteProject
                   projectId={project.id}
                   s3Keys={project.s3Keys}
                   supabaseThumbnail={project.Thumbnail_URL}
                   onDeleteSuccess={(deletedProjectId) =>
                   setProjects(projects.filter((p) => p.id !== deletedProjectId))
                  }
                />


                </div>
              
            ))
          ) : (
            <p className="text-gray-500 text-center">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
