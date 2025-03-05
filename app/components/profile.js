import { FaPen } from "react-icons/fa"; // For the pencil icon
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";

// Define userProps object first
const userProps = {
  avatarProps: {
    src: "https://github.com/shadcn.png",
  },
  name: "Stavan K",
  email: "stavankalkumbe@gmail.com", // Example email
};

const content = (
  <PopoverContent className="w-[300px] h-[360px] bg-green-200 border border-gray-300 shadow-lg rounded-lg p-4">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <img
          src={userProps.avatarProps.src}
          alt={userProps.name}
          className="rounded-full"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full cursor-pointer">
          <FaPen className="text-white text-sm" />
        </div>
      </div>
      <span className="text-sm text-gray-500">{userProps.email}</span>
      <span className="text-lg font-medium text-black">Hi, {userProps.name}</span>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4 w-full">
        <Button className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80 transition-all">
          My Projects
        </Button>
        <Button className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80 transition-all">
          Profile Settings
        </Button>
        <Button className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 px-4 rounded-lg hover:opacity-80 transition-all">
          Logout
        </Button>
      </div>
    </div>
  </PopoverContent>
);

export default function Profile() {
  return (
    <div className="flex flex-wrap gap-4">
      <Popover showArrow backdrop="blur" offset={10} placement="bottom">
        <PopoverTrigger>
          <Button
            className="capitalize flex items-center p-2 rounded-full bg-transparent hover:bg-green-100"
            color="warning"
            variant="flat"
          >
            <img
              src={userProps.avatarProps.src}
              alt={userProps.name}
              className="rounded-full mr-2"
              style={{ width: "30px", height: "30px" }}
            />
            <span className="text-lg text-black">{userProps.name}</span>
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
}
