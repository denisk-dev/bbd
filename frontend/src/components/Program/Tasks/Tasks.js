import React, { useState, useEffect } from "react";

// import ToggleCard from "./ToggleCard/ToggleCard";
import { tasksWrapper } from "./Tasks.module.scss";

import { fetchTasks } from "../../../redux/auth/dayActions";

import gym from "../../../assets/image/gym.svg";
import cardio from "../../../assets/image/cardio.svg";
import meal from "../../../assets/image/meal.svg";
import muscle from "../../../assets/image/muscle.svg";
import musclefeeder from "../../../assets/image/musclefeeder.svg";

import ToggleCard from "./ToggleCard/ToggleCard";
import { useSelector, useDispatch } from "react-redux";

const Tasks = ({ dayTasks, currentDay, currentUserProgress }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks(currentDay + 1));
  }, [currentDay]);

  const state = useSelector((state) => state.tasks.tasks.response);

  //console.log(state);

  // console.log(dayTasks);
  // console.log(currentDay);
  // console.log(currentUserProgress);

  // console.log(
  //   dayTasks && currentUserProgress
  //     ? "daytasks are here"
  //     : "daytasks are not here"
  // );

  //console.log(currentUserProgress);

  return (
    <div style={{ background: "#131114" }}>
      <div className={tasksWrapper}>
        {dayTasks && currentUserProgress
          ? [...Array(dayTasks.cardio.amount)].map((element) => {
              return (
                <ToggleCard
                  color="red"
                  taskName="Cardio"
                  icon={cardio}
                  userProgress={currentUserProgress}
                  taskToFinish="cardio"
                  currentDay={currentDay}
                />
              );
            })
          : ""}

        {dayTasks && currentUserProgress
          ? [...Array(dayTasks.exercises.amount)].map((element) => {
              return (
                <ToggleCard
                  color="#0880ce"
                  taskName="Workout"
                  icon={gym}
                  userProgress={currentUserProgress}
                  taskToFinish="exercises"
                  currentDay={currentDay}
                />
              );
            })
          : ""}

        {dayTasks && currentUserProgress
          ? [...Array(dayTasks.meals.amount)].map((element, index) => {
              return (
                <ToggleCard
                  color="#64D465"
                  taskName="Meal"
                  icon={meal}
                  userProgress={currentUserProgress}
                  taskToFinish="meals"
                  num={index}
                  currentDay={currentDay}
                />
              );
            })
          : ""}
        {dayTasks && currentUserProgress
          ? [...Array(dayTasks.vacuums.amount)].map((element, index) => {
              return (
                <ToggleCard
                  color="#d3d3d3"
                  taskName="Vacuum"
                  icon={muscle}
                  userProgress={currentUserProgress}
                  taskToFinish="vacuums"
                  num={index}
                  currentDay={currentDay}
                />
              );
            })
          : ""}
        {dayTasks && currentUserProgress
          ? [...Array(dayTasks.feeder.amount)].map((element, index) => {
              return (
                <ToggleCard
                  color="#FFB229"
                  taskName="Feeder"
                  icon={musclefeeder}
                  userProgress={currentUserProgress}
                  taskToFinish="feeder"
                  num={index}
                  currentDay={currentDay}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Tasks;
