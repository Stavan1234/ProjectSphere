"use client";

import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel'; // Corrected path
import {Image} from "@nextui-org/react";

export default function ProjectCarousel() { // ✅ Added parentheses here

  return (
    <>
      {/* Web Development Section */}
      <div className="w-full max-w-4xl mt-[50px] ml-[-300px] mb-9">
        <div className="text-2xl font-bold mb-4 text-left">
          <h2>Web Development</h2>
        </div>
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 p-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square mb-0.5 relative">
                    <Image
                         isZoomed
                         src={`/webdev${index}.jpeg`}
                         alt={`Project ${index}`}
                         fill
                         className="object-cover w-[225px] h-[225px]"
                    />

                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-blue-950 font-semibold mb-05 text-center">Project Ttile {index}</h3>
                      <p className="text-sm text-gray-600">
                        This is a sample project description for project {index}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>

      {/* Machine Learning Section */}
      <div className="w-full max-w-4xl mt-[350px] ml-[-300px] mb-9">
        <div className="text-2xl font-bold mb-4 text-left">
          <h2>Machine Learning</h2>
        </div>
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 p-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-square mb-0.5 relative">
                    <Image
                         isZoomed
                         src={`/macler${index}.jpeg`}
                         alt={`Project ${index}`}
                         fill
                         className="object-cover w-[225px] h-[225px]"
                    />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-blue-950 font-semibold mb-05 text-center">Project {index}</h3>
                      <p className="text-sm text-gray-600">
                        This is a sample project description for project {index}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
