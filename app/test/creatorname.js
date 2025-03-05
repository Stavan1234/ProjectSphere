import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button"; // Corrected import statement

const CreatorNames = ({ onCreatorNamesChange }) => {
  const [error, setError] = useState("");
  const [creatorNames, setCreatorNames] = useState([""]);

  const isDuplicate = (name, index) => {
    if (creatorNames.slice(0, index).includes(name)) {
      setError("Duplicate creator names are not allowed.");
      return true;
    }
    setError("");
    return false;
  };

  const addCreator = () => {
    setCreatorNames([...creatorNames, ""]);
  };

  const removeCreator = (index) => {
    setCreatorNames(creatorNames.filter((_, i) => i !== index));
  };

  const handleCreatorChange = (index, value) => {
    if (isDuplicate(value, index)) {
      return; // Prevent updating if it's a duplicate
    }
    const updatedNames = [...creatorNames];
    updatedNames[index] = value;
    setCreatorNames(updatedNames);
  };

  // Notify parent component of creator names change
  useEffect(() => {
    onCreatorNamesChange(creatorNames);
  }, [creatorNames, onCreatorNamesChange]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Project Creator Names:</h3>
      {error && <p className="text-red-500">{error}</p>}
      {creatorNames.map((name, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4">
          <Input
            type="text"
            value={name}
            placeholder={`Enter Creator Name ${index + 1}`}
            onChange={(e) => handleCreatorChange(index, e.target.value)}
            required
            className="flex-grow shadow-lg border border-[#00A8A8] bg-[#E0F7FA] text-[#004D40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
          />
          {creatorNames.length > 1 && (
            <Button
              color="danger"
              variant="light"
              auto
              onClick={() => removeCreator(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addCreator} className="border-transparent bg-transparent shadown-none" color="primary" variant="default">
        + Add Creator
      </Button>
    </div>
  );
};

export default CreatorNames;
