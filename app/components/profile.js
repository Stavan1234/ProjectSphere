"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { FaPen } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

// Initialize Supabase
const supabase = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else if (user) {
        setUserEmail(user.email);
        setUserName(user.user_metadata?.full_name || "User"); // If name is available
      } else {
        router.push("/login"); // Redirect to login if no user is found
      }
    };

    fetchUser();
  }, []);

  const logout_now = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/login"); // Redirect to login after logout
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayName = (fullName) => {
    if (!fullName) return "User";
    
    // Get first name only
    const firstName = fullName.split(' ')[0];
    
    // Shorten if needed (max 7 characters)
    return firstName.length > 7 
      ? `${firstName.substring(0, 7)}...`
      : firstName;
  };

  const myproject = async (event) => {
    event.preventDefault(); 
    setLoading(true); 
    setErrorMessage(""); 
  
    try {
      router.push("/myprojects");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again."); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Popover showArrow backdrop="blur" offset={10} placement="bottom">
        <PopoverTrigger>
          <Button className="capitalize flex items-center p-2 rounded-full bg-transparent hover:bg-green-100">
            <img
              src="https://github.com/shadcn.png"
              alt={userName}
              className="rounded-full mr-2"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-lg text-black">
  {getDisplayName(userName)}
</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] h-[360px] bg-green-200 border border-gray-300 shadow-lg rounded-lg p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <img
                src="https://github.com/shadcn.png"
                alt={userName}
                className="rounded-full"
                style={{ width: "80px", height: "80px" }}
              />
              <div className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer">
                <FaPen className="text-white text-sm" />
              </div>
            </div>
            <span className="text-sm text-gray-500">{userEmail}</span>
            <span className="text-lg font-medium text-black">Hi, {userName}</span>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 w-full">
            <Button
  onClick={myproject} // Attach the myproject function here
  className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80"
  disabled={loading} // Disable the button while loading
>
  {loading ? "Redirecting..." : "My Projects"}
</Button>
              <Button className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80">
                Profile Settings
              </Button>
              <Button onClick={logout_now} className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80" disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>

            {/* Error Message */}
            {/* {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profile;
