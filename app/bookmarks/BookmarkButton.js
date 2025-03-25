"use client";

import { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import supabase from "../config/ProjectSphereClient";

const supabase2 = createClient(
  "https://kbvpjhjgxogmezhtskaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnBqaGpneG9nbWV6aHRza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTI4NzcsImV4cCI6MjA1NDU2ODg3N30.WLMitaLDmC_cZY2erKfyzlpBIkNiHIZF0Xm3xQHicuc"
);

export default function BookmarkButton({ projectId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuthAndBookmark = async () => {
      try {
        const { data: { user }, error } = await supabase2.auth.getUser();
        
        if (error || !user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }
        
        setUserEmail(user.email);
        
        const { data, error: bookmarkError } = await supabase
          .from('Bookmarks')
          .select()
          .eq('user_email', user.email)
          .eq('project_id', projectId)
          .single();

        if (bookmarkError) console.error(bookmarkError);
        
        setIsBookmarked(!!data);
      } catch (err) {
        console.error("Bookmark error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndBookmark();
  }, [projectId]);

  const toggleBookmark = async () => {
    if (!userEmail) {
      alert("Please login to bookmark projects");
      return;
    }
    
    try {
      if (isBookmarked) {
        await supabase
          .from('Bookmarks')
          .delete()
          .eq('user_email', userEmail)
          .eq('project_id', projectId);
      } else {
        await supabase
          .from('Bookmarks')
          .insert([{ user_email: userEmail, project_id: projectId }]);
      }
      
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Toggle bookmark error:", err);
    }
  };

  // Always show button, but change style if not logged in
  return (
    <button 
      onClick={toggleBookmark}
      className={`fixed top-24 right-8 text-2xl z-[100] p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all
        ${!userEmail ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      disabled={!userEmail}
    >
      {isBookmarked ? (
        <FaBookmark className="text-yellow-500" />
      ) : (
        <FaRegBookmark className="text-gray-500 hover:text-yellow-500" />
      )}
    </button>
  );
}