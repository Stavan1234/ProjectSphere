const DownloadLinks = () => {
  const downloadLinks = [
    { name: "report.pdf", url: "/downloads/report.pdf" },
    { name: "presentation.pptx", url: "/downloads/presentation.pptx" },
    { name: "documentation.docx", url: "/downloads/documentation.docx" },
  ];

  return (
    <div className="items-centre space-y-3 mt-6">
      {downloadLinks.map((file, index) => (
        <div key={index} className="flex items-center gap-4">
          
          <a
            href={file.url}
            download
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download
          </a>
          <span className="text-lg text-gray-700">{file.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DownloadLinks;
