"use client";

import React, { useState } from "react";
import { Select, Textarea, Input, Button, Chip, Row, Col, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Reusable Input Field Component
const InputField = ({ label, placeholder, value, onChange, required = false }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <Input
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      clearable
    />
  </div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, placeholder, value, onChange, rows = 4, required = false }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <Textarea
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
    />
  </div>
);

// Reusable Select Dropdown for Categories
const SelectCategory = ({ categories, value, onChange }) => (
  <Select fullWidth value={value} onChange={onChange} aria-label="Category">
    <Select.Option value="">Select Category</Select.Option>
    {categories.map((category) => (
      <Select.Option key={category} value={category}>
        {category}
      </Select.Option>
    ))}
  </Select>
);

const ProjectUploadForm = () => {
  const [creatorNames, setCreatorNames] = useState([""]);
  const [domain, setDomain] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [techCategories, setTechCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const router = useRouter();

  // List of available categories based on domain
  const categories = [
    "Languages",
    "Frameworks & Tools",
    "Databases",
    "Libraries & Tools",
    "Hardware",
    "Sensors",
    "Software",
    "Platforms",
    "Tools",
    "Frameworks",
  ];

  const domains = [
    { label: "Web Development", value: "web-development" },
    { label: "Machine Learning", value: "machine-learning" },
    { label: "IOT & Embedded Systems", value: "iot-embedded-systems" },
    { label: "Robotics and Automation", value: "robotics-automation" },
    { label: "Digital Signal Processing & Communications", value: "digital-signal-processing" },
    { label: "Software Development", value: "software-development" },
    { label: "Open Domain", value: "open-domain" },
    { label: "Artificial Intelligence", value: "artificial-intelligence" },
    { label: "Cloud Computing", value: "cloud-computing" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "Data Science", value: "data-science" },
  ];

  // Handle Domain Change
  const handleDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setDomain(selectedDomain);
    // Define technologies based on domain selection
    setTechCategories(getCategoriesForDomain(selectedDomain));
  };

  const getCategoriesForDomain = (domain) => {
    const domainCategories = {
      "web-development": [
        "Languages",
        "Frameworks & Tools",
        "Databases",
      ],
      "machine-learning": [
        "Languages",
        "Libraries & Tools",
        "Platforms",
      ],
      "iot-embedded-systems": [
        "Hardware",
        "Sensors",
        "Software",
      ],
      "robotics-automation": [
        "Hardware",
        "Software",
        "Frameworks",
      ],
      "digital-signal-processing": [
        "Languages",
        "Libraries",
        "Hardware",
      ],
      "software-development": [
        "Languages",
        "Frameworks",
        "Tools",
      ],
      "open-domain": ["Tools"],
      "artificial-intelligence": [
        "Languages",
        "Libraries & Tools",
        "Platforms",
      ],
      "cloud-computing": ["Languages", "Platforms", "Tools"],
      "cybersecurity": ["Languages", "Tools", "Frameworks"],
      "data-science": ["Languages", "Libraries", "Platforms"],
    };
    return domainCategories[domain] || [];
  };

  const handleAddTechnology = () => {
    setTechnologies([...technologies, { category: categoryInput, technology: "" }]);
    setCategoryInput(""); // Reset input after adding
  };

  const handleTechChange = (index, value) => {
    const updatedTechnologies = [...technologies];
    updatedTechnologies[index].technology = value;
    setTechnologies(updatedTechnologies);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Project Upload Form</h1>
        <form className="space-y-4">
          {/* Project Title */}
          <InputField label="Project Title" placeholder="Enter project title" required />

          {/* Project Creator Names */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Creator Names:</label>
            {creatorNames.map((creator, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  fullWidth
                  value={creator}
                  onChange={(e) => {
                    const updatedNames = [...creatorNames];
                    updatedNames[index] = e.target.value;
                    setCreatorNames(updatedNames);
                  }}
                  placeholder={`Creator Name ${index + 1}`}
                  required
                />
                {creatorNames.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => setCreatorNames(creatorNames.filter((_, i) => i !== index))}
                    className="ml-2"
                    color="error"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => setCreatorNames([...creatorNames, ""])} className="text-blue-500">
              + Add Creator
            </Button>
          </div>

          {/* Project Domain */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Domain</label>
            <Select fullWidth value={domain} onChange={handleDomainChange}>
              {domains.map((domain) => (
                <Select.Option key={domain.value} value={domain.value}>
                  {domain.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Dynamic Technology Inputs */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Technologies Used</label>
            {techCategories.map((category, index) => (
              <Row key={index} align="center" className="space-x-4 mb-2">
                <Col span={6}>
                  <Chip>{category}</Chip>
                </Col>
                <Col span={12}>
                  <Input
                    fullWidth
                    placeholder={`Technology for ${category}`}
                    value={technologies[index]?.technology || ""}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                  />
                </Col>
              </Row>
            ))}
            <Row justify="center">
              <Col span={12}>
                <Button type="button" onClick={handleAddTechnology} fullWidth>
                  Add Technology
                </Button>
              </Col>
            </Row>
          </div>

          {/* Project Summary */}
          <TextAreaField label="Project Summary" placeholder="Write a brief project summary" required />

          {/* Submit Button */}
          <Button type="submit" className="w-full" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
