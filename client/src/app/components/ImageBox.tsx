import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface ImageBoxProps {
  onImageUpload: (base64: string) => void;
  src?: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ onImageUpload, src }) => {
  const [image, setImage] = useState<string | null>(src || null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      onImageUpload(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const boxStyle: React.CSSProperties = {
    width: "300px",
    height: "300px",
    border: "2px dashed #ffffff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#2b475e",
    color: "#ffffff",
    cursor: "pointer",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };

  const textComponent = () => (
    <div style={{ textAlign: "center" }}>
      <FontAwesomeIcon icon={faUpload} />
      <p>Drop or Press to upload image</p>
    </div>
  );

  return (
    <div
      style={boxStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById("imageInput")?.click()}
    >
      {image ? (
        <img src={image} alt="Uploaded" style={imageStyle} />
      ) : (
        textComponent()
      )}
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        style={{ display: "none" }}
        onChange={handleFileInput}
      />
    </div>
  );
};

export default ImageBox;
