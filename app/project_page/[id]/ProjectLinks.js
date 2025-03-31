import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectLinks({ links }) {
  if (!links || links.length === 0) {
    return <p>No links available.</p>;
  }

  return (
    <div className="space-y-2">
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
