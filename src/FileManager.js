import React, { useState } from "react";
import { LuFolder, LuFile } from "react-icons/lu";

const FileFolderCreator = ({ level }) => {
  const [fileType, setFileType] = useState("file");
  const [fileName, setFileName] = useState("");
  const [createdItems, setCreatedItems] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (fileType === "file") {
        const newFile = { type: "file", name: fileName };
        setCreatedItems([...createdItems, newFile]);
      } else if (fileType === "folder") {
        const newFolder = { type: "folder", name: fileName, items: [] };
        setCreatedItems([...createdItems, newFolder]);
      }
      setFileName("");
    }
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  return (
    <div className={`filemanager ${level % 2 === 0 ? "grey" : "white"}`}>
      <input
        type="text"
        value={fileName}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <label>
        <input
          type="radio"
          value="file"
          checked={fileType === "file"}
          onChange={handleFileTypeChange}
        />
        File
      </label>
      <label>
        <input
          type="radio"
          value="folder"
          checked={fileType === "folder"}
          onChange={handleFileTypeChange}
        />
        Folder
      </label>
      {createdItems.map((item, index) => (
        <div key={index}>
          {item.type === "folder" ? (
            <div className="filemanager">
              <LuFolder /> {item.name}
              <FileFolderCreator level={level + 1} />
            </div>
          ) : (
            <div>
              <LuFile /> {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileFolderCreator;
