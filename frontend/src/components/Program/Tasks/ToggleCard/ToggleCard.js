import React, { useState } from "react";
import axios from "axios";

import { card } from "./ToggleCard.module.scss";
import done from "../../../../assets/image/done.png";

const ToggleCard = ({
  color,
  taskName,
  icon,
  userProgress,
  num,
  taskToFinish,
  currentDay,
}) => {
  let selectedOrNot = false;

  switch (taskName) {
    case "Workout":
      let data = userProgress ? userProgress.exercises : null;
      //console.log(data);
      if (data && data !== false) selectedOrNot = true;

      break;
    case "Cardio":
      let cardio = userProgress ? userProgress.cardio : null;
      //console.log(cardio);
      if (cardio && cardio !== false) selectedOrNot = true;
      break;
    case "Meal":
      let meals = userProgress ? userProgress.meals : null;
      // console.log(meals);
      if (
        meals[num] !== undefined &&
        meals[num] !== null &&
        meals[num] !== false
      )
        selectedOrNot = true;
      break;
    case "Vacuum":
      let vacuums = userProgress ? userProgress.vacuums : null;
      // console.log(meals);
      if (
        vacuums[num] !== undefined &&
        vacuums[num] !== null &&
        vacuums[num] !== false
      )
        selectedOrNot = true;
      break;
    case "Feeder":
      let feeder = userProgress ? userProgress.feeder : null;
      // console.log(meals);
      if (
        feeder[num] !== undefined &&
        feeder[num] !== null &&
        feeder[num] !== false
      )
        selectedOrNot = true;
      break;
  }

  const [task, setTask] = useState(selectedOrNot ? true : false);

  //console.log(selectedOrNot);

  const selectTask = () => {
    //TODO research how this works
    setTask((prevState) => !prevState);

    // console.log(task);
    // console.log(selectedOrNot);

    let obj = { ...userProgress };

    //console.log(obj);

    //console.log(num);

    console.log(!task);

    console.log(taskName);
    console.log(taskToFinish);

    //i think the problem is !task
    switch (taskName) {
      case "Workout":
        //console.log(task);
        obj[taskToFinish] = !task;
        break;
      case "Cardio":
        //console.log(task);
        obj[taskToFinish] = !task;
        break;
      case "Meal":
      case "Vacuum":
      case "Feeder":
        obj[taskToFinish][num] = !task;
        break;
    }

    console.log(obj);

    //console.log(JSON.stringify(obj));

    axios.post(
      `http://localhost:3500/progress/${localStorage.getItem("userEmail")}/${
        currentDay + 1
      }`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div
      className={card}
      style={
        task
          ? {
              background: color,
              border: `4px solid ${color}`,
              color: "whitesmoke",
              backgroundImage: `url(${done})`,
            }
          : { border: `4px solid ${color}`, color: color }
      }
      onClick={selectTask}
    >
      <img src={icon} alt="" />
      <h2>{taskName}</h2>

      <i
        className="fas fa-exclamation-circle"
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          color: "white",
        }}
      ></i>
    </div>
  );
};

export default ToggleCard;
