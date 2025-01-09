const tools = {
  Languages: ["Python", "JavaScript"],
  FrameworksTools: ["React", "Node.js"],
  Databases: ["MongoDB", "PostgreSQL"],
};

export default function Technologies() {
  return (
    <div className="">
      {/* Languages */}
      <div className="flex items-start">
        <h3 className="font-semibold text-lg text-gray-800 min-w-[150px]">Languages:</h3>
        <p className="text-xl text-gray-700">{tools.Languages.join(", ")}</p>
      </div>

      {/* Frameworks/Tools */}
      <div className="flex items-start mt-2">
        <h3 className="font-semibold text-lg text-gray-800 min-w-[150px]">Frameworks & Tools:</h3>
        <p className="text-xl text-gray-700">{tools.FrameworksTools.join(", ")}</p>
      </div>

      {/* Databases */}
      <div className="flex items-start mt-2">
        <h3 className="font-semibold text-lg text-gray-800 min-w-[150px]">Databases:</h3>
        <p className="text-xl text-gray-700">{tools.Databases.join(", ")}</p>
      </div>
    </div>
  );
}
