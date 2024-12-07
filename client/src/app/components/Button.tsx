"use client";

import React from "react";
import { ButtonType } from "../enums/ButtonType.enum";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  text: string;
  width?: string;
  icon?: IconDefinition;
  type: ButtonType;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  width = "100%",
  icon,
  onClick,
}) => {
  const isPrimary = type === ButtonType.PRIMARY;

  const mainColor = isPrimary
    ? "var(--primary-color)"
    : "var(--background-color)";

  const buttonStyle: React.CSSProperties = {
    padding: "10px 40px",
    border: `3px solid ${isPrimary ? "var(--primary-color)" : "white"}`,
    backgroundColor: mainColor,
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    transition: "all 0.3s ease",
    width,
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  };

  const hoverStyle: React.CSSProperties = {
    border: `3px solid ${mainColor}`,
    backgroundColor: "white",
    color: mainColor,
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const iconStyle: React.CSSProperties = {
    pointerEvents: "none", // Prevent hover behavior on the icon itself
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) =>
        Object.assign((e.target as HTMLElement).style, hoverStyle)
      }
      onMouseOut={(e) =>
        Object.assign((e.target as HTMLElement).style, buttonStyle)
      }
      onClick={onClick}
    >
      {text} {icon && <FontAwesomeIcon style={iconStyle} icon={icon} />}
    </button>
  );
};

export default Button;
