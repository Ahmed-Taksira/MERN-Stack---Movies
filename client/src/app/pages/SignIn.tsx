"use client";

import React, { useRef, useState } from "react";
import InputField from "../components/InputField";
import { Validator } from "../utils/Validator";
import Button from "../components/Button";
import { ButtonType } from "../enums/ButtonType.enum";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<{ validate: () => boolean }>(null);
  const passwordRef = useRef<{ validate: () => boolean }>(null);

  const submit = () => {
    const isEmailValid = emailRef.current?.validate() ?? true;
    const isPasswordValid = passwordRef.current?.validate() ?? true;

    if (isEmailValid && isPasswordValid) navigate("/movies");
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20vh",
    width: "20vw",
    marginLeft: "40%",
  };

  const rememberMeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.7)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "5vh" }}>Sign In</h1>
      <InputField
        ref={emailRef}
        label="Email"
        validators={[Validator.isRequired, Validator.isEmail]}
        onChange={(value) => {
          setEmail(value);
        }}
      ></InputField>
      <InputField
        type="password"
        ref={passwordRef}
        label="Password"
        validators={[Validator.isRequired]}
        onChange={(value) => setPassword(value)}
      ></InputField>
      <div style={rememberMeStyle}>
        <input type="checkbox" id="rememberMe" style={{ marginRight: "8px" }} />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div style={{ marginTop: "3vh", width: "100%" }}>
        <Button
          text={"Login"}
          onClick={submit}
          type={ButtonType.PRIMARY}
        ></Button>
      </div>
    </div>
  );
}
