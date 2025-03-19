"use client";

import { useState } from "react"; // ✅ Import useState

export default function DeleteProject({ projectId, s3Keys, supabaseThumbnail, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click event

    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/delete-project", {
        method: "DELETE",
        body: JSON.stringify({ projectId, s3Keys, supabaseThumbnail }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      alert("✅ Project deleted successfully!");
      onDeleteSuccess(projectId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
