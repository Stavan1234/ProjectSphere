import { Chip, Avatar } from "@nextui-org/react";

export default function Developers({ developers }) {
  if (!developers || developers.length === 0) return null;

  return (
    <div className="flex gap-4">
      {developers.map((developer, index) => (
        <Chip
          key={index}
          className="bg-teal-300"
          avatar={
            <Avatar
              name={developer}
              style={{ width: "30px", height: "30px" }}
              src={`https://i.pravatar.cc/300?u=${developer.toLowerCase()}`}
            />
          }
          variant="flat"
        >
          {developer}
        </Chip>
      ))}
    </div>
  );
}