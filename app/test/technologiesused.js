import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"; // Ensure this is the correct dropdown import

const TechnologiesUsed = ({ onTechnologiesChange }) => {
  const [error, setError] = useState("");
  const [technologies, setTechnologies] = useState([{ category: "", tech: "" }]);

  const handleAddTechnology = () => {
    setTechnologies([...technologies, { category: "", tech: "" }]);
  };

  const handleTechnologyChange = (index, field, value) => {
    const updatedTechnologies = [...technologies];
    updatedTechnologies[index][field] = value;
    setTechnologies(updatedTechnologies);
  };

  const handleRemoveTechnology = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  // Notify parent component of technologies change
  useEffect(() => {
    onTechnologiesChange(technologies);
  }, [technologies, onTechnologiesChange]);

  const validateTechnologies = () => {
    const hasTechnology = technologies.some(tech => tech.tech.trim() !== "");
    if (!hasTechnology) {
      setError("At least one technology must be entered.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
      {technologies.map((tech, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          {/* Dropdown for Category */}
          <Dropdown className="bg-white" backdrop="blur">
            <DropdownTrigger>
              <Button variant="bordered" className="border border-[#00ACC1] bg-transparent text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-[#A1E3F9] focus:outline-none transition-all">
                {tech.category || "Select Category"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => handleTechnologyChange(index, "category", key)}
              aria-label="Static Actions"
            >
              <DropdownItem key="Languages:">Languages</DropdownItem>
              <DropdownItem key="Frameworks & Tools:">Frameworks & Tools</DropdownItem>
              <DropdownItem key="Databases:">Databases</DropdownItem>
              <DropdownItem key="Libraries & Tools:">Libraries & Tools</DropdownItem>
              <DropdownItem key="Platforms:">Platforms</DropdownItem>
              <DropdownItem key="Hardware:">Hardware</DropdownItem>
              <DropdownItem key="Sensors:">Sensors</DropdownItem>
              <DropdownItem key="Software:">Software</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Input for Technology */}
          <Input
            type="text"
            value={tech.tech}
            placeholder="Enter Technology"
            onChange={(e) => handleTechnologyChange(index, "tech", e.target.value)}
            className="flex-grow shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
          />

          {/* Remove Button */}
          {technologies.length > 1 && (
            <Button
              color="danger"
              variant="light"
              auto
              onClick={() => handleRemoveTechnology(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      {/* Add Technology Button */}
      <Button onClick={() => { handleAddTechnology(); validateTechnologies(); }} className="border-transparent bg-transparent shadow-none" color="primary" variant="default">
        + Add Technology
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TechnologiesUsed;
