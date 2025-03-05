// import { FaDownload } from "react-icons/fa";

const DownloadLinks = () => {
  const downloadLinks = [
    { name: "Project Report (PDF)", url: "/downloads/report.pdf" },
    { name: "Presentation (PPT)", url: "/downloads/presentation.pptx" },
    { name: "Documentation (Word)", url: "/downloads/documentation.docx" },
  ];

  return (
    <div className="space-y-3 mt-6 ">
      {downloadLinks.map((file, index) => (
        <a
          key={index}
          href={file.url}
          download
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-600"
        >
          {/* <FaDownload className="text-yellow-500" /> Add your preferred color here */}
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download {file.name}
          </button>
        </a>
      ))}
    </div>
  );
};

export default DownloadLinks;
