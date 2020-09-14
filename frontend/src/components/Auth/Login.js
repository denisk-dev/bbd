import React, { useState, useEffect } from "react";
import Axios from "axios";

import { useDispatch } from "react-redux";

import { formWrapper, form, credInput, logInButton } from "./Login.module.scss";

import { useHistory } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

const Login = () => {
  let history = useHistory();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    Axios.post("http://localhost:3500/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //TODO modify this
        console.log(res);
        console.log(input.email);
        localStorage.setItem("userEmail", input.email);
        localStorage.setItem("token", res.data.token);
        history.push("/welcome");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.errorMessage);
        }
      });
  };

  return (
    <div className={formWrapper}>
      <div className={form}>
        <h1>Bigger By The Day</h1>
        <form onSubmit={onSubmit}>
          <input
            className={credInput}
            type="text"
            name="email"
            style={
              errorMessage &&
              errorMessage === "User with this email doesn't exist"
                ? { border: "2px solid red" }
                : {}
            }
            placeholder="Email"
            value={input.email}
            onChange={(e) => handleInputChange(e)}
          />

          <input
            className={credInput}
            type="password"
            name="password"
            style={
              errorMessage && errorMessage === "Incorrect password"
                ? { border: "2px solid red" }
                : {}
            }
            placeholder="Password"
            value={input.password}
            onChange={(e) => handleInputChange(e)}
          />

          <p>Forgot password?</p>

          <input className={logInButton} type="submit" value="Log In" />
          <p>
            Not Registered? <a href="/signup">Create an Account</a>
          </p>
          <ErrorMessage message={errorMessage} />
        </form>
      </div>
    </div>
  );
};

export default Login;
