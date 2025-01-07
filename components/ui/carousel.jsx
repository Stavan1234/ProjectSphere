"use client"; // Enables the file to be a client component in Next.js

// Import necessary libraries and components
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react"; // Embla Carousel for smooth scrolling and carousel logic
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icons for navigation buttons

import { cn } from "@/lib/utils"; // Utility function to conditionally join class names
import { Button } from "@/components/ui/button"; // Reusable button component

// Create a React context for the carousel to manage state across components
const CarouselContext = React.createContext(null);

// Custom hook to use the carousel context
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />"); // Ensure the hook is used within the Carousel component
  }

  return context;
}

// Main Carousel component with forward ref for better handling in parent components
const Carousel = React.forwardRef((
  {
    orientation = "horizontal", // Default orientation is horizontal
    width = 1200, // Default width of the carousel
    height = 300, // Default height of the carousel
    top = "auto", // Default positioning from the top
    left = "auto", // Default positioning from the left
    right = "auto", // Default positioning from the right
    bottom = "auto", // Default positioning from the bottom
    opts, // Additional options for the Embla carousel
    setApi, // Function to set the carousel API
    plugins, // Plugins for the carousel
    className, // Additional class names
    children, // Carousel items passed as children
    ...props // Other props
  },
  ref // Ref for accessing the DOM element
) => {
  // Initialize the Embla carousel with provided options and plugins
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y", // Set the axis based on orientation
  }, plugins);

  // State to track whether previous and next scroll actions are possible
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  // Callback to update scroll state on selection change
  const onSelect = React.useCallback((api) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev()); // Check if scrolling backwards is possible
    setCanScrollNext(api.canScrollNext()); // Check if scrolling forwards is possible
  }, []);

  // Function to scroll to the previous item
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  // Function to scroll to the next item
  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollPrev, scrollNext]);

  // Effect to set the carousel API in the parent component
  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  // Effect to update scroll state when the carousel is re-initialized or selected
  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Render the carousel container
  return (
    <CarouselContext.Provider
      value={{
        carouselRef, // Reference to the carousel DOM element
        api: api, // Carousel API for external control
        opts, // Carousel options
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"), // Set orientation
        scrollPrev, // Scroll to previous item function
        scrollNext, // Scroll to next item function
        canScrollPrev, // State for previous scroll availability
        canScrollNext, // State for next scroll availability
      }}
    >
      <div
        ref={ref} // Forwarded ref for parent component access
        onKeyDownCapture={handleKeyDown} // Capture keyboard events
        className={cn("relative", className)} // Apply class names
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          top: typeof top === 'number' ? `${top}px` : top,
          left: typeof left === 'number' ? `${left}px` : left,
          right: typeof right === 'number' ? `${right}px` : right,
          bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
          position: 'absolute'
        }}
        role="region" // Accessibility role
        aria-roledescription="carousel" // Accessibility description
        {...props} // Spread other props
      >
        {children} // Render carousel items
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel"; // Set display name for debugging

// Component to hold carousel content
const CarouselContent = React.forwardRef(({ className, width = "100%", height = "auto", ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div 
      ref={carouselRef} 
      className="overflow-hidden"
      style={{ width, height }}
    >
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// Component for individual carousel items
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 w-1/3",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// Button to navigate to the previous slide
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-12 w-12 rounded-full bg-black/50 hover:bg-black/70", orientation === "horizontal"
        ? "-left-16 top-1/2 -translate-y-1/2"
        : "-top-16 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

// Button to navigate to the next slide
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-12 w-12 rounded-full bg-black/50 hover:bg-black/70", orientation === "horizontal"
        ? "-right-16 top-1/2 -translate-y-1/2"
        : "-bottom-16 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// Export all components for external use
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
