// "use client";

// import Header from "./components/Header";
// import ProjectCarousel from "./components/carousel";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
//       {/* Reusable Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
//         <ProjectCarousel />
//       </main>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import ProjectCarousel from "./components/carousel";
import { createClient } from "@supabase/supabase-js"; 


const supabase = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        await router.push("/login"); // Redirect to login if there's an error
      } else if (!user) {
        await router.push("/login"); // Redirect to login if no user is found
      } else {
        setIsLoading(false); // User is authenticated, stop loading
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
        <Header />
        <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
          <p className="text-xl text-gray-700">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-[#DEFAFF] via-[#BCFFEF] to-[#FFFFFF] bg-fixed">
      {/* Reusable Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col items-center pt-20 pb-10 px-4 min-h-full w-full">
        <ProjectCarousel />
      </main>
    </div>
  );
}