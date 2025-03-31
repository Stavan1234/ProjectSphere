"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Editor } from "@tinymce/tinymce-react";

// Prevent SSR hydration issues
const NoSSRWrapper = dynamic(() => Promise.resolve(Editor), {
  ssr: false,
});

const RichTextEditor = ({ value, onChange }) => {
  return (
    <NoSSRWrapper
      apiKey="your-tinymce-api-key" // Replace with your API key or remove if not needed
      value={value}
      onEditorChange={onChange}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help",
      }}
    />
  );
};

export default RichTextEditor;
