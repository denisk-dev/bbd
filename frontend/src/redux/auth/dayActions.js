import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_REQUEST,
} from "./dayTypes";
import Axios from "axios";

export const fetchTasks = (day) => {
  return (dispatch) => {
    // console.log("i am here in fetchTasks");
    // console.log(day);
    // console.log(localStorage.getItem("userEmail"));
    dispatch(fetchTasksRequest());
    Axios.get(
      `http://localhost:3500/progress/${localStorage.getItem(
        "userEmail"
      )}/${day}`
    )
      .then((response) => {
        const tasks = response.data;
        //console.log(response);
        dispatch(fetchTasksSuccess(tasks));
      })
      .catch((error) => {
        dispatch(fetchTasksFailure(error.message));
      });
  };
};

export const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  };
};

export const fetchTasksFailure = (error) => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error,
  };
};
