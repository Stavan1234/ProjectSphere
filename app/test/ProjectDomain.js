"use client";

import React, { useState, useEffect } from "react";

const ProjectDomain = ({ onDomainChange }) => {
  const [selectedDomain, setSelectedDomain] = useState("");

  const handleDomainChange = (event) => {
    const value = event.target.value;
    setSelectedDomain(value);
  };

  // Notify parent component of domain change
  useEffect(() => {
    onDomainChange(selectedDomain);
  }, [selectedDomain, onDomainChange]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Project Domain:</h3>

      <div>
        <select
          value={selectedDomain}
          required
          onChange={handleDomainChange} // Use onChange here
          className="flex-grow shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
        >
          <option value="">Select Domain</option>
          <option value="web-development">Web Development</option>
          <option value="machine-learning">Machine Learning</option>
          <option value="iot-embedded-systems">IOT & Embedded Systems</option>
          <option value="robotics-automation">Robotics and Automation</option>
          <option value="digital-signal-processing">Digital Signal Processing & Communications</option>
          <option value="software-development">Software Development</option>
          <option value="open-domain">Open Domain</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectDomain;
