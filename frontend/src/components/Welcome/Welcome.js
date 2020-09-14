import React from "react";
import axios from "axios";
import {
  welcomeWrapper,
  welcomeBody,
  continueProgram,
  startNewProgram,
} from "./Welcome.module.scss";

import { useHistory } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

const Welcome = () => {
  let history = useHistory();

  const startNewBBDProgram = () => {
    console.log("start new");

    //SHOULD I CHANGE LOCALSTORAGE NAME??
    axios
      .post("http://localhost:3500/startnew", {
        method: "POST",
        body: localStorage.getItem("userEmail"),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        history.push("/program");
      });
  };

  return (
    <div className={welcomeWrapper}>
      <Navbar navHeight="9%" />
      <div className={welcomeBody}>
        <p>Bigger By The day</p>
        <div>
          <button onClick={startNewBBDProgram} className={startNewProgram}>
            Start New Program
          </button>
          <a className={continueProgram} href="/program">
            Continue Program
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
