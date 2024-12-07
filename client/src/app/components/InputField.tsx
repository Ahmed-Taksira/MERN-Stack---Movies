/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Validator } from "../interfaces/Validator.interface";

interface InputFieldProps {
  label: string;
  disabled?: boolean;
  initialValue?: string;
  type?: string;
  validators: Validator[];
  onChange: (value: any) => void;
}

const InputField = forwardRef((props: InputFieldProps, ref) => {
  const {
    label,
    disabled = false,
    validators,
    initialValue = "",
    type = "text",
    onChange,
  } = props;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const validateInput = (newValue?: string): boolean => {
    const valueToValidate = newValue ?? value;
    for (const validator of validators) {
      if (!validator.validate(valueToValidate)) {
        setError(validator.errorMessage);
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    validateInput(value);
    setValue(value);
    onChange(value);
  };

  useImperativeHandle(ref, () => ({
    validate: validateInput,
  }));

  const containerStyle: React.CSSProperties = {
    marginBottom: "20px",
    width: "100%",
  };

  const inputStyle: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100% ",
    padding: "12px 16px",
    borderRadius: "8px",
    border: error ? "1px solid red" : "1px solid transparent",
    backgroundColor: "var(--input-color)",
    color: "white",
    fontSize: "16px",
    outline: "none",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={handleChange}
        style={inputStyle}
        onBlur={(event) => validateInput(event.target.value)}
        placeholder={label}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
});

export default InputField;
