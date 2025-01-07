import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"; // Corrected import path

export default function Profile() {
  const userProps = {
    avatarProps: {
      src: "https://github.com/shadcn.png", // Ensure this URL is valid
    },
    name: "Stavan K",
  };

  return (
    <div className="absolute top-5 right-5">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="flex items-center bg-transparent p-0">
            <img
              src={userProps.avatarProps.src}
              alt={userProps.name}
              className="rounded-full mr-2" // Add margin to separate from the name
              style={{ width: '40px', height: '40px' }} // Adjust size as needed
            />
            <span className="text-lg">{userProps.name}</span>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div>
            <p>Welcome, Stavan K!</p>
            <p>Here is some additional information.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}