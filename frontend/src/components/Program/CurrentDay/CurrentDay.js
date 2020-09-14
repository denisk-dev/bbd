import React from "react";

import { dayCard, currentDay } from "./CurrentDay.module.scss";

import Arrow from "../../../assets/image/arrow.svg";
import BackArrow from "../../../assets/image/backarrow.svg";

const CurrentDay = ({ day, iterateDay }) => {
  //console.log(day);

  return (
    <div className={currentDay}>
      <img src={BackArrow} alt="arrow" onClick={() => iterateDay("back")} />
      <div className={dayCard}>
        <p>Day</p>
        <p>{day ? day.day : ""}</p>
      </div>
      <img src={Arrow} alt="arrow" onClick={() => iterateDay("forward")} />
    </div>
  );
};

export default CurrentDay;
