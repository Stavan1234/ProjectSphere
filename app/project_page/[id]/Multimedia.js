"use client";

import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import supabase from "../../config/ProjectSphereClient";
import { useParams } from "next/navigation";

const Multimedia = () => {
  const { id } = useParams(); // Get project ID from URL
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchMultimedia = async () => {
      if (!id) return; // Ensure ID is available

      const { data, error } = await supabase
        .from("ProjectSphere Form")
        .select("img_url, vid_url") // Fetch only multimedia fields
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching multimedia:", error);
      } else {
        console.log("Fetched Data:", data); // Debugging output

        // Ensure img_url and vid_url are arrays and remove empty "{}" values
        setImages(
          Array.isArray(data.img_url) ? data.img_url.filter(url => url && url !== "{}") : []
        );
        setVideos(
          Array.isArray(data.vid_url) ? data.vid_url.filter(url => url && url !== "{}") : []
        );
      }
    };

    fetchMultimedia();
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleVideoClick = (videoSrc) => {
    setSelectedVideo(videoSrc);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Combine images and videos into a single array
  const multimedia = [
    ...images.map((url) => ({ type: "image", url })),
    ...videos.map((url) => ({ type: "video", url })),
  ];

  return (
    <div className="ml-[50px] mt-[-50px]">
      {/* Debugging Log */}
      {console.log("Multimedia to be displayed:", multimedia)}

      {/* Combined Image and Video Grid */}
      {multimedia.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {multimedia.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                item.type === "image"
                  ? handleImageClick(index)
                  : handleVideoClick(item.url)
              }
              className="cursor-pointer"
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`Image ${index + 1}`}
                  width={300}
                  height={168}
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <div className="relative">
                  <video
                    className="rounded-lg w-full h-auto object-cover"
                    preload="metadata"
                  >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <span className="text-white text-4xl">▶</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No multimedia available</p>
      )}

      {/* Lightbox for Enlarged Image */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={images.map((url) => ({ src: url }))}
          index={currentIndex}
          onView={({ index }) => setCurrentIndex(index)}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <video
              controls
              autoPlay
              className="rounded-lg w-full h-auto"
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Multimedia;