// import { Chip, Avatar } from "@nextui-org/react";

// export default function Developers() {
//   const developers = ["Stavan Kalkumbe", "Anurodh Chandanshiv", "David Almeida", "Joshua"];

//   // Find the longest name
//   const longestName = developers.reduce((max, developer) =>
//     developer.length > max.length ? developer : max
//   , '');

//   return (
    
// <div className="flex gap-4 text-bold">

//       {developers.map((developer, index) => (
//         <Chip
//           key={index}
//           className="bg-teal-300 text-bold"
//           avatar={
//             <Avatar
//               name={developer}
//               style={{ width: "30px", height: "30px" }}
//               src={`https://i.pravatar.cc/300?u=${developer.toLowerCase()}`}
//             />
//           }
//           variant="flat"
//           style={{ width: `${longestName.length * (10+2)}px` }}  // Adjust width based on longest name length
//         >
//           {developer}
//         </Chip>
//       ))}
//     </div>
  
//   );
// }

import { Chip, Avatar } from "@nextui-org/react";

export default function Developers({ developers }) {
  if (!developers || developers.length === 0) return null;

  // Determine chip width based on the longest name
  const longestName = developers.reduce((max, developer) =>
    developer.length > max.length ? developer : max
  , '');

  return (
    <div className="flex gap-4 text-bold">
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
          style={{ width: `${longestName.length * (10 + 5)}px` }}
        >
          {developer}
        </Chip>
      ))}
    </div>
  );
}


