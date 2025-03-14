// "use client";

// import { 
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '../../components/ui/carousel';
// import { Image } from "@nextui-org/react";
// import { useEffect, useState } from 'react';
// import supabase from '../config/ProjectSphereClient';

// // Define the order of domains
// const domains = [
//   "Web Development",
//   "Machine Learning",
//   "IOT & Embedded Systems",
//   "Robotics and Automation",
//   "Digital Signal Processing & Communications",
//   "Software Development",
//   "Open Domain"
// ];

// export default function ProjectCarousel() {
//   const [fetchError, setFetchError] = useState(null);
//   const [projectsByDomain, setProjectsByDomain] = useState({});

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("ProjectSphere Form") // Ensure correct table name
//           .select("Project_Title, Thumbnail_URL, Project_Domain, Project_Text_area");

//         if (error) throw error;

//         if (!data || data.length === 0) {
//           setFetchError("No projects available.");
//           setProjectsByDomain({});
//           return;
//         }

//         // Group projects by their domain
//         const groupedProjects = {};
//         data.forEach((project) => {
//           const domain = project.Project_Domain || "Other"; // Default if domain is missing
//           if (!groupedProjects[domain]) groupedProjects[domain] = [];
//           groupedProjects[domain].push(project);
//         });

//         setProjectsByDomain(groupedProjects);
//         setFetchError(null);
//       } catch (err) {
//         console.error("Error fetching projects:", err.message);
//         setFetchError("Failed to fetch projects.");
//         setProjectsByDomain({});
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <div className="w-full max-w-4xl mt-[50px] ml-[-300px] mb-9">
//       {fetchError && <p className="text-center text-red-500">{fetchError}</p>}

//       {domains.map((domain) => (
//         <section key={domain} className="mb-10 min-h-[360px]"> {/* Adjust height if needed */}
//   <h2 className="text-2xl font-bold mb-1 text-left">{domain}</h2>

//   {projectsByDomain[domain]?.length > 0 ? (
//     <div className="min-h-[250px]"> {/* Ensures space for the carousel */}
//       <Carousel>
//         <CarouselContent>
//           {projectsByDomain[domain].map((project, index) => (
//             <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 p-4">
//               <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className="aspect-square mb-0.5 relative">
//                   <Image
//                     isZoomed
//                     src={project.Thumbnail_URL || "macler1.jpeg"} 
//                     alt={project.Project_Title || "Untitled Project"}
//                     className="object-cover w-[225px] h-[225px]"
//                   />
//                 </div>
//                 <div className="p-1">
//                   <h3 className="text-lg text-blue-950 font-semibold mb-1 text-center truncate w-full">
//                     {project.Project_Title || "Untitled Project"}
//                   </h3>
//                   <div className="text-sm text-gray-600 text-center line-clamp-2 overflow-hidden overflow-ellipsis">
//                       {project.Project_Text_area || "No description available."}
//                   </div>
//                   <div className="flex items-center justify-center mt-2">
//                            <span className="text-yellow-500">★★★★☆</span>
//                           <span className="ml-1 text-sm text-gray-600">(4.2)</span>
//                          <span className="ml-4 text-sm text-gray-600">1.2k views</span> {/* Dummy views */}
//                   </div>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="hidden sm:flex" />
//         <CarouselNext className="hidden sm:flex" />
//       </Carousel>
//     </div>
//   ) : (
//     <p className="flex justify-center items-center text-gray-500 text-xl font-semibold text-center h-32">
//   No projects available in {domain}.
// </p>

//   )}
// </section>



//       ))}
//     </div>
//   );
// }

"use client";

import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel';
import { Image } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import supabase from '../config/ProjectSphereClient';

const domains = [
  "Web Development",
  "Machine Learning",
  "IOT & Embedded Systems",
  "Robotics and Automation",
  "Digital Signal Processing & Communications",
  "Software Development",
  "Open Domain"
];

export default function ProjectCarousel() {
  const router = useRouter();
  const [fetchError, setFetchError] = useState(null);
  const [projectsByDomain, setProjectsByDomain] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("ProjectSphere Form") // Ensure correct table name
          .select("id, Project_Title, Thumbnail_URL, Project_Domain, Project_Text_area");

        if (error) throw error;

        if (!data || data.length === 0) {
          setFetchError("No projects available.");
          setProjectsByDomain({});
          return;
        }

        const groupedProjects = {};
        data.forEach((project) => {
          const domain = project.Project_Domain || "Other";
          if (!groupedProjects[domain]) groupedProjects[domain] = [];
          groupedProjects[domain].push(project);
        });

        setProjectsByDomain(groupedProjects);
        setFetchError(null);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
        setFetchError("Failed to fetch projects.");
        setProjectsByDomain({});
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id) => {
    if (id) {
      router.push(`/project_page/${id}`); // Navigate to the project page
    }
  };

  return (
    <div className="w-full max-w-4xl mt-[50px] ml-[-300px] mb-9">
      {fetchError && <p className="text-center text-red-500">{fetchError}</p>}

      {domains.map((domain) => (
        <section key={domain} className="mb-10 min-h-[360px]">
          <h2 className="text-2xl font-bold mb-1 text-left">{domain}</h2>

          {projectsByDomain[domain]?.length > 0 ? (
            <div className="min-h-[250px]">
              <Carousel>
                <CarouselContent>
                  {projectsByDomain[domain].map((project, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 p-4">
                      {/* Clickable Project Card */}
                      <div
                        onClick={() => handleProjectClick(project.id)}
                        className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      >
                        <div className="aspect-square mb-0.5 relative">
                          <Image
                            isZoomed
                            src={project.Thumbnail_URL || "macler1.jpeg"}
                            alt={project.Project_Title || "Untitled Project"}
                            className="object-cover w-[225px] h-[225px]"
                          />
                        </div>
                        <div className="p-1">
                          <h3 className="text-lg text-blue-950 font-semibold mb-1 text-center truncate w-full">
                            {project.Project_Title || "Untitled Project"}
                          </h3>
                          <div className="text-sm text-gray-600 text-center line-clamp-2 overflow-hidden overflow-ellipsis">
                            {project.Project_Text_area || "No description available."}
                          </div>
                          <div className="flex items-center justify-center mt-2">
                            <span className="text-yellow-500">★★★★☆</span>
                            <span className="ml-1 text-sm text-gray-600">(4.2)</span>
                            <span className="ml-4 text-sm text-gray-600">1.2k views</span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          ) : (
            <p className="flex justify-center items-center text-gray-500 text-xl font-semibold text-center h-32">
              No projects available in {domain}.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
