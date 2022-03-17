import React, { useReducer } from "react";

// 1. initState
const initState = {
  job: "",
  listJob: [],
};

const SET_JOB = "SET_JOB";
const ADD_JOB = "ADD_JOB";
const DELETE_JOB = "DELETE_JOB";

// 2. Action
const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

// 3. Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        listJob: [...state.listJob, action.payload],
      };
    case DELETE_JOB:
      const newListJob = [...state.listJob];
      newListJob.splice(action.payload, 1);
      return {
        ...state,
        listJob: newListJob,
      };
    default:
      throw new Error("Invalid Action");
  }
};

// 4. Dispatch

function Home(props) {
  const [todos, dispatch] = useReducer(reducer, initState);
  const { job, listJob } = todos;

  const handleAddJob = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
  };

  return (
    <div>
      <input
        value={job}
        type="text"
        placeholder="Nhập công việc..."
        onChange={(e) => dispatch(setJob(e.target.value))}
      />
      <button onClick={handleAddJob}>Add</button>
      <ul>
        {listJob.map((item, index) => (
          <li key={index}>
            {item}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(deleteJob(item))}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
