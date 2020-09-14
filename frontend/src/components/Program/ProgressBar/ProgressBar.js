import React from "react";

import { progressBar, barContainer, bar } from "./ProgressBar.module.scss";

const ProgressBar = () => {
  return (
    <div className={progressBar}>
      <p>Effort</p>
      <div className={barContainer}>
        <div
          className={bar}
          style={{
            background: "#0880ce",
            width: "60%",
            padding: "0.4rem",
          }}
        >
          60%
        </div>
        <div
          className={bar}
          style={{ background: "lightgrey", width: "40%", padding: "0.4rem" }}
        ></div>
        {/* <div className={bar} style={{ padding: "10px" }}>
          Effort
        </div> */}
      </div>
      <p>Progress</p>
      <div className={barContainer}>
        <div
          className={bar}
          style={{
            background: "#dd2730",
            width: "80%",
            padding: "0.4rem",
          }}
        >
          80%
        </div>
        <div
          className={bar}
          style={{ background: "lightgrey", width: "20%", padding: "0.4rem" }}
        ></div>
        {/* <div className={bar} style={{ padding: "10px" }}>
          Progress
        </div> */}
      </div>
    </div>
  );
};

export default ProgressBar;
