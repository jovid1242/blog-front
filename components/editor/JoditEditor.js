import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const Jjeditor = ({ hanldeChange }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
  };

  useEffect(() => {
    hanldeChange(content);
  }, [content]);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  );
};
export default Jjeditor;
