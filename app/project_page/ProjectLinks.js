import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectLinks() {
  const links = [
    { url: "https://ieeexplore.ieee.org/" },
    { url: "https://scholar.google.com/" },
    { url: "https://www.mongodb.com/docs/" },
  ];

  return (
    <div className="space-y-3 p-4 bg-transparent rounded-lg shadow-md border">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <FaExternalLinkAlt />
          <span>{link.url}</span>
        </a>
      ))}
    </div>
  );
}
