import React, { useEffect, useState } from "react";

import {
  dayCard,
  currentDay,
  progressWrapper,
  programWrapper,
  progressBar,
  bodyProgram,
} from "./Program.module.scss";

import axios from "axios";

import CurrentDay from "./CurrentDay/CurrentDay";

import Navbar from "../Navbar/Navbar";
import ProgressBar from "./ProgressBar/ProgressBar";
import Tasks from "./Tasks/Tasks";

const Program = () => {
  const [todayTasks, setTodayTasks] = useState({});
  const [currentDay, setCurrentDay] = useState(0);
  const [currentUserProgress, setCurrentUserProgress] = useState({});

  useEffect(() => {
    setTodayTasks({});
    axios
      .get("http://localhost:3500/program")
      .then((res) => {
        const { days } = res.data;
        setTodayTasks({ ...todayTasks, days });
      })
      .catch((err) => console.log(err));
  }, [currentDay]);

  useEffect(() => {
    setCurrentUserProgress({});
    axios
      .get(
        `http://localhost:3500/progress/${localStorage.getItem("userEmail")}/${
          currentDay + 1
        }`
      )
      .then((res) => {
        const data = res.data.response;
        setCurrentUserProgress({ ...data });
      })
      .catch((err) => console.log(err));
  }, [currentDay]);

  useEffect(() => {
    axios
      .post("http://localhost:3500/getday", {
        method: "POST",
        body: localStorage.getItem("userEmail"),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCurrentDay(res.data.day - 1);
      });
  }, []);

  //console.log(todayTasks);
  //console.log(currentDay);
  //console.log(currentUserProgress);

  //Fix this shit
  const iterateDay = (iter) => {
    // console.log(iter);
    if (iter === "forward") {
      setCurrentDay(currentDay + 1);
    } else if (iter === "back") {
      //  console.log("here");
      if (currentDay > 0) setCurrentDay(currentDay - 1);
    }
  };

  //console.log(todayTasks);

  return (
    <div className={programWrapper}>
      <Navbar navHeight="80px" />
      <div className={bodyProgram}>
        <div className={progressWrapper}>
          <CurrentDay
            day={todayTasks.days ? todayTasks.days[currentDay] : ""}
            iterateDay={iterateDay}
          />
          <ProgressBar />
        </div>
      </div>
      <Tasks
        dayTasks={todayTasks.days ? todayTasks.days[currentDay] : undefined}
        currentDay={currentDay}
        currentUserProgress={
          !(
            Object.keys(currentUserProgress).length === 0 &&
            currentUserProgress.constructor === Object
          )
            ? currentUserProgress
            : undefined
        }
      />
    </div>
  );
};

export default Program;
