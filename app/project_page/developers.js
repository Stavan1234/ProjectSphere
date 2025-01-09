import { Chip, Avatar } from "@nextui-org/react";

export default function Developers() {
  const developers = ["Stavan Kalkumbe", "Anurodh Chandanshiv", "David Almeida"];

  // Find the longest name
  const longestName = developers.reduce((max, developer) =>
    developer.length > max.length ? developer : max
  , '');

  return (
    <div className="flex flex-col gap-4 text-bold">
      {developers.map((developer, index) => (
        <Chip
          key={index}
          className="bg-teal-300 text-bold"
          avatar={
            <Avatar
              name={developer}
              style={{ width: "30px", height: "30px" }}
              src={`https://i.pravatar.cc/300?u=${developer.toLowerCase()}`}
            />
          }
          variant="flat"
          style={{ width: `${longestName.length * (10+2)}px` }}  // Adjust width based on longest name length
        >
          {developer}
        </Chip>
      ))}
    </div>
  );
}
