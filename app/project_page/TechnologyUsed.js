// import { useState } from "react";

// const domainData = [
//   {
//     domain: "Web Development",
//     tools: [
//       { category: "Languages", items: ["HTML", "CSS", "JavaScript"] },
//       { category: "Frameworks & Tools", items: ["React", "Node.js"] },
//       { category: "Databases", items: ["MongoDB", "PostgreSQL"] },
//     ],
//   },
//   {
//     domain: "Machine Learning",
//     tools: [
//       { category: "Languages", items: ["Python", "R", "MATLAB"] },
//       { category: "Libraries & Tools", items: ["TensorFlow", "Scikit-learn", "PyTorch"] },
//       { category: "Platforms", items: ["Google Colab", "Jupyter Notebooks"] },
//     ],
//   },
//   {
//     domain: "IoT & Embedded Systems",
//     tools: [
//       { category: "Hardware", items: ["Arduino", "ESP8266", "Raspberry Pi"] },
//       { category: "Sensors", items: ["PIR Motion Sensor", "Ultrasonic Sensor"] },
//       { category: "Software", items: ["Arduino IDE", "Node-RED"] },
//     ],
//   },
//   {
//     domain: "Robotics and Automation",
//     tools: [
//       { category: "Hardware", items: ["Motors", "Microcontrollers", "Robotic Arms"] },
//       { category: "Software", items: ["ROS (Robot Operating System)", "Gazebo", "Matlab"] },
//       { category: "Frameworks", items: ["OpenCV", "MoveIt", "PyRobot"] },
//     ],
//   },
//   {
//     domain: "Digital Signal Processing & Communications",
//     tools: [
//       { category: "Languages", items: ["MATLAB", "Python"] },
//       { category: "Libraries", items: ["SciPy", "NumPy"] },
//       { category: "Hardware", items: ["DSP Kits", "FPGA Boards"] },
//     ],
//   },
//   {
//     domain: "Software Development",
//     tools: [
//       { category: "Languages", items: ["C#", "Java", "Python"] },
//       { category: "Frameworks", items: [".NET", "Spring Boot"] },
//       { category: "Tools", items: ["Git", "Docker", "Kubernetes"] },
//     ],
//   },
//   {
//     domain: "Open Domain",
//     tools: [
//       { category: "Languages", items: ["Any relevant language"] },
//       { category: "Tools", items: ["Custom tools based on the project"] },
//     ],
//   },
// ];

// export default function Technologies() {
//   const [selectedDomain] = useState(domainData[0]); // Setting the first domain as default

//   return (
//     <div className="pl-[20px] pb-[40px] relative top-1/2 translate-y-1/4">
//       {/* Render Technologies for Selected Domain */}
//       {selectedDomain.tools.map((tool, index) => (
//         <div key={index} className="flex items-start mt-2">
//           <h3 className="font-semibold text-lg text-gray-800 min-w-[150px]">{tool.category}:</h3>
//           <p className="text-xl text-gray-700">{tool.items.join(", ")}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

["{\"category\":\"Languages:\",\"tech\":\"Python\"}","{\"category\":\"Hardware:\",\"tech\":\"djsfhjahfdjka\"}"]

export default function Technologies({ technologies }) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className="pl-[20px] pb-[40px] relative top-1/2 translate-y-1/4">
      {technologies.map((tool, index) => (
        <div key={index} className="flex items-start mt-2">
          <h3 className="font-semibold text-lg text-gray-800 min-w-[150px]">
            {tool.category}
          </h3>
          <p className="text-xl text-gray-700">
            {tool.tech || "No technologies listed"}
          </p>
        </div>
      ))}
    </div>
  );
}



