import React, { useState } from "react";
import { LuFolder, LuFile } from "react-icons/lu";

const CreateItem = ({
  fileType,
  handleFileTypeChange,
  fileName,
  handleInputChange,
  handleCreate,
}) => {
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
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

const FileFolderCreator = () => {
  const [fileType, setFileType] = useState("file");
  const [fileName, setFileName] = useState("");
  const [createdItems, setCreatedItems] = useState([]);

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  const handleCreate = () => {
    if (fileType === "file") {
      const newFile = { type: "file", name: fileName };
      setCreatedItems([...createdItems, newFile]);
    } else if (fileType === "folder") {
      const newFolder = { type: "folder", name: fileName, items: [] };
      setCreatedItems([...createdItems, newFolder]);
    }
    setFileName("");
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
              fileType={fileType} // Pass fileType as a prop
              handleFileTypeChange={handleFileTypeChange}
              fileName={fileName}
              handleInputChange={handleInputChange}
              handleCreate={() => handleCreate(item)}
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
        fileName={fileName}
        handleInputChange={handleInputChange}
        handleCreate={handleCreate}
      />
      <div>{displayItems(createdItems)}</div>
    </div>
  );
};

export default FileFolderCreator;
