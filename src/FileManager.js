import React, { useState } from "react";
import { LuFolder, LuFile } from "react-icons/lu";

const CreateItem = ({ fileType, handleFileTypeChange, handleCreate }) => {
  const [fileName, setFileName] = useState("");

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  const handleCreateItem = () => {
    handleCreate(fileName);
    setFileName(""); // Clear the input field after creating an item
  };

  return (
    <div>
      <input type="text" value={fileName} onChange={handleInputChange} />
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
      <button onClick={handleCreateItem}>Create</button>
    </div>
  );
};

const FileFolderCreator = () => {
  const [fileType, setFileType] = useState("file");
  const [createdItems, setCreatedItems] = useState([]);

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleCreate = (itemName) => {
    if (fileType === "file") {
      const newFile = { type: "file", name: itemName };
      setCreatedItems([...createdItems, newFile]);
    } else if (fileType === "folder") {
      const newFolder = { type: "folder", name: itemName, items: [] };
      setCreatedItems([...createdItems, newFolder]);
    }
  };

  const displayItems = (items) => {
    return items.map((item, index) => (
      <div key={index}>
        {item.type === "folder" ? (
          <div>
            <div>
              <LuFolder /> {item.name}
            </div>
            {item.items.length > 0 && <div>{displayItems(item.items)}</div>}
            <CreateItem
              fileType={fileType}
              handleFileTypeChange={handleFileTypeChange}
              handleCreate={(itemName) => handleCreate(itemName)}
            />
          </div>
        ) : (
          <div>
            <LuFile /> {item.name}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <CreateItem
        fileType={fileType}
        handleFileTypeChange={handleFileTypeChange}
        handleCreate={(itemName) => handleCreate(itemName)}
      />
      <div>{displayItems(createdItems)}</div>
    </div>
  );
};

export default FileFolderCreator;
