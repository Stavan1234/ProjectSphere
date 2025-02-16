"use client";

import React, { useState, useEffect } from 'react';
import { Image } from '@nextui-org/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Multimedia = () => {
  const [modalImage, setModalImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState([
    "/macler1.jpeg",
    "/macler2.jpeg",
    "/project1.jpeg",
    "/webdev1.jpeg",
    "/webdev2.jpeg",
    "/project6.jpeg",
    "/macler5.jpeg",
    "/macler6.jpeg",
  ]);

  const handleImageClick = (imageSrc, index) => {
    setModalImage(imageSrc);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [lightboxOpen]);

  return (
    <div className="ml-[50px] mt-[-50px]">
      {/* Grid Layout for Images */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => (
          <div key={index} onClick={() => handleImageClick(image, index)} className="cursor-pointer">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={300}
              height={168}
              objectfit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
        <div>
          <video controls className="rounded-lg w-full h-auto object-cover mt-4">
            <source src="/DemoVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Lightbox for Enlarged Image */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={modalImage}
          onCloseRequest={() => setLightboxOpen(false)}
          nextSrc={images[(currentIndex + 1) % images.length]}
          prevSrc={images[(currentIndex - 1 + images.length) % images.length]}
          onMovePrevRequest={() => {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length);
            setModalImage(images[(currentIndex - 1 + images.length) % images.length]);
          }}
          onMoveNextRequest={() => {
            setCurrentIndex((currentIndex + 1) % images.length);
            setModalImage(images[(currentIndex + 1) % images.length]);
          }}
        />
      )}
    </div>
  );
};

export default Multimedia;
