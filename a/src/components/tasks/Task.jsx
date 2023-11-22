import React from "react";
import "./Task.Module.css";


function task({ task, e, setDay, day, addLocalSTR }) {
  return (
    <div key={day + e} className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <input
          onClick={() => {
            setDay((prev) => {
              console.log(task.completed);
              prev[e].completed = !prev[e].completed;
              console.log(prev[e].completed);
              addLocalSTR();
              return prev;
            });
            console.log("prev[e].completed");
          }}
          type="checkbox"
          name=""
          id={day + e}
        />
        <label htmlFor={day + e}>{task.event}</label>
      </div>
      <div className="task-time">{task.time}</div>
    </div>
  );
}

export default task;
