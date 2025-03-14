"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import supabase from "../../config/ProjectSphereClient";
import Header from "../../components/Header";

export default function WebDevProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store error

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("ProjectSphere Form")
          .select("id, Project_Title, Thumbnail_URL, Project_Text_area")
          .eq("Project_Domain", "Web Development") // Fetch only Web Dev projects
          .order("id", { ascending: false }); // Show latest projects first

        if (error) {
          throw new Error(error.message); // If error, throw it for debugging
        }

        if (data) {
          console.log("Fetched Projects:", data); // Log the data to ensure it's coming through
          setProjects(data);
        } else {
          setProjects([]); // If no data, reset the state
        }
      } catch (err) {
        console.error("Error fetching projects:", err); // Log any errors
        setError(err.message); // Set error message state
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id) => {
    router.push(`/project_page/${id}`);
  };
  

  return (
<div>
    <Header/>

    <div className="max-w-4xl mx-auto pt-20 py-6">
      
      <h2 className="text-2xl text-center font-bold mb-4">Web Development Projects</h2>

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
            <Card
              key={project.id}
              isPressable
              onPress={() => handleProjectClick(project.id)}
              className="flex flex-row bg-transparent
               shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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

                {/* Rating & Views */}
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  {/* Rating (For now hardcoded as 4.2) */}
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-1">(4.2)</span>

                  {/* Views (Assuming Views is a numeric field in your database) */}
                  <span className="ml-4">4.6k views</span>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">No projects found.</p>
        )}
      </div>
    </div>
    </div>
  );
}