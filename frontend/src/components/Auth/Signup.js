import React, { useState } from "react";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

import {
  formWrapper,
  formBlockWrapper,
  userInput,
  submit,
} from "./Signup.module.scss";

const Signup = () => {
  let history = useHistory();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    reenterpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    if (input.name === "") {
      setErrorMessage("Name is not valid");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      setErrorMessage("Email is not valid");
    } else if (input.password.length < 6) {
      setErrorMessage("Password is not valid. Should be at least 6 characters");
    } else if (input.password.localeCompare(input.reenterpassword)) {
      setErrorMessage("Make sure your passwords match");
    } else if (!/\d/.test(input.password)) {
      setErrorMessage("Password must contain a digit");
    } else if (!/[!@#$%^&*]/.test(input.password)) {
      setErrorMessage(
        "Password must contain a special character($,#,@,!,%,^,&,*)"
      );
    } else {
      Axios.post("http://localhost:3500/signup", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        //TODO modify this
        console.log(res);
        history.push("/login");
      });
    }
  };

  return (
    <div className={formWrapper}>
      <div className={formBlockWrapper}>
        <h1>Bigger By The Day</h1>
        <form onSubmit={onSubmit}>
          <input
            className={userInput}
            style={
              errorMessage && errorMessage === "Name is not valid"
                ? { border: "2px solid red" }
                : {}
            }
            type="text"
            name="name"
            placeholder="Name"
            value={input.name}
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className={userInput}
            style={
              errorMessage && errorMessage === "Email is not valid"
                ? { border: "2px solid red" }
                : {}
            }
            type="text"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            className={userInput}
            style={
              errorMessage === "Password must contain a digit" ||
              errorMessage ===
                "Password must contain a special character($,#,@,!,%,^,&,*)" ||
              errorMessage === "Make sure your passwords match" ||
              (errorMessage ===
                "Password is not valid. Should be at least 6 characters" &&
                errorMessage)
                ? { border: "2px solid red" }
                : {}
            }
            type="password"
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            className={userInput}
            style={
              errorMessage === "Password must contain a digit" ||
              errorMessage ===
                "Password must contain a special character($,#,@,!,%,^,&,*)" ||
              errorMessage === "Make sure your passwords match" ||
              (errorMessage ===
                "Password is not valid. Should be at least 6 characters" &&
                errorMessage)
                ? { border: "2px solid red" }
                : {}
            }
            type="password"
            placeholder="Confirm Password"
            name="reenterpassword"
            value={input.reenterpassword}
            onChange={(e) => handleInputChange(e)}
          />

          <p>
            Already have an Account? <a href="/login">Sign In</a>
          </p>

          <input className={submit} type="submit" value="Get Started" />

          <ErrorMessage message={errorMessage} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
