import "./App.css";
import React, { useState } from "react";
import Task from "./components/tasks/Task";

function App() {
  console.log("ret app");
  const [datas, setDatas] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : { today: [], tomorrow: [], afterTomorrow: [] }
  );
  console.log(datas);
  const { today, tomorrow, afterTomorrow } = datas;
  const [returns, setReturns] = useState(true);
  const [todays, setToday] = useState(today);
  const [tomorrows, setTomorrow] = useState(tomorrow);
  const [afterTomorrows, setAfterTomorrow] = useState(afterTomorrow);

  function addLocalSTR() {
    localStorage.setItem(
      "tasks",
      JSON.stringify({
        today: todays,
        tomorrow: tomorrows,
        afterTomorrow: afterTomorrows,
      })
    );
    setDatas(JSON.parse(localStorage.getItem("tasks")));
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  setInterval(() => {
    document.querySelector(
      ".dates"
    ).textContent = `Bugun: ${days}.${month}.${year}, ${hour}:${minute}`;
  }, 500);

  function addTask() {
    // const data = { today: [], tomorrow: [], afterTomorrow: [] }
    const data = JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : { today: [], tomorrow: [], afterTomorrow: [] };
    console.log(data);
    const text = document.querySelector(".input").value;
    // const text = "Non sotib olish bugun 18:00";

    if (text !== null && text !== "") {
      // regex
      const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.\d{4}$/;
      const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      const todayRegex = /\b(bugun)\b/i;
      const tomorrowRegex = /\b(ertaga)\b/i;

      let splText = text.split(" ");
      console.log(text);
      splText = splText.map((e) => e.toLowerCase());
      const Days = [todayRegex, tomorrowRegex, dateRegex];
      Days.forEach((day, i) => {
        if (splText[0].match(day)) {
          if (splText.length >= 2 && splText.at(-1).match(timeRegex)) {
            data[i == 0 ? "today" : i == 1 ? "tomorrow" : "afterTomorrow"].push(
              {
                event: splText.slice(1, -1).join(" "),
                time:
                  i == 2
                    ? `${splText[0]},` + splText.at(-1).split(":")[1] > 0
                      ? `${splText[0]}, ${+splText.at(-1).split(":")[0] + 1}:00`
                      : `${splText[0]}, ${splText.at(-1).split(":")[0]}:${
                          splText.at(-1).split(":")[1]
                        }`
                    : splText.at(-1).split(":")[1] > 0
                    ? `${+splText.at(-1).split(":")[0] + 1}:00`
                    : `${splText.at(-1).split(":")[0]}:${
                        splText.at(-1).split(":")[1]
                      }`,
                completed: false,
              }
            );
          }
          data[i == 0 ? "today" : i == 1 ? "tomorrow" : "afterTomorrow"].push({
            event: splText.slice(1).join(" "),
            time:
              i == 1
                ? "9:00"
                : i == 2
                ? `${splText[0]}, 9:00`
                : minute > 0
                ? `${hour + 1}:00`
                : `${hour}:${minute}`,
            completed: false,
          });
        }
        console.log(splText.at(-1));
        if (splText.length >= 1 && splText.at(-1).match(day)) {
          console.log(splText);
          data[i == 0 ? "today" : i == 1 ? "tomorrow" : "afterTomorrow"].push({
            event: splText.slice(0, -1).join(" "),
            time:
              i == 2
                ? `${splText.at(-1)}, 9:00`
                : i == 1
                ? "9:00"
                : minute > 0
                ? `${hour + 1}:00`
                : `${hour}:${minute}`,
            completed: false,
          });
        }
        console.log(splText);
        console.log(splText.at(-2).match());
        if (
          splText.length >= 2 &&
          splText.at(-2).match(day) &&
          splText.at(-1).match(timeRegex)
        ) {
          console.log(splText.at(-1).split(":")[1]);
          console.log(splText.at(-1).split(":")[1] > 0);
          data[i == 0 ? "today" : i == 1 ? "tomorrow" : "afterTomorrow"].push({
            event: splText.slice(0, -2).join(" "),
            time:
              i == 2
                ? splText.at(-1).split(":")[1] > 0
                  ? `${splText.at(-2)}, ${+splText.at(-1).split(":")[0] + 1}:00`
                  : `${splText.at(-2)}, ${splText.at(-1).split(":")[0]}:${
                      splText.at(-1).split(":")[1]
                    }`
                : splText.at(-1).split(":")[1] > 0
                ? `${+splText.at(-1).split(":")[0] + 1}:00`
                : `${splText.at(-1).split(":")[0]}:${
                    splText.at(-1).split(":")[1]
                  }`,
            completed: false,
          });
        } else {
          console.log(data);
          data.today.push({
            event: text,
            time: minute > 0 ? `${hour + 1}:00` : `${hour}:${minute}`,
            completed: false,
          });
          console.log({
            event: text,
            time: minute > 0 ? `${hour + 1}:00` : `${hour}:${minute}`,
            completed: false,
          });
        }
      });
    }
    console.log(data);
    const dassss = data;
    console.log(data);
    console.log(dassss);
    const pppp = JSON.stringify(dassss);
    localStorage.setItem("saa", "asfa");
    localStorage.setItem("tasks", pppp);

    setDatas(JSON.parse(localStorage.getItem("tasks")));
    console.log(JSON.parse(localStorage.getItem("tasks")));
  }

  let counts = { y: 0, n: 0 };
  function num() {
    const count = { y: 0, n: 0 };
    todays.forEach((element) => {
      element.completed ? (count.y += 1) : (count.n += 1);
    });
    tomorrows.forEach((element) => {
      element.completed ? (count.y += 1) : (count.n += 1);
    });
    afterTomorrows.forEach((element) => {
      element.completed ? (count.y += 1) : (count.n += 1);
    });
    counts = count;
  }
  num();

  return (
    <div className="app">
      <h2>Vazifalar menedjeri</h2>
      <div className="add">
        <div className="add-task">
          <input
            className="input"
            placeholder="Yangi vazifa qo'shish"
            type="text"
          />
          <button onClick={() => addTask()}>+</button>
        </div>
        <div className="date">
          <span className="dates">Bugun: 10.10.2012, 12:00</span>
        </div>
      </div>
      <div className="today">
        <>
          {todays && <h1>Bugun</h1>}
          {todays &&
            todays.map((task, e) => {
              return (
                <Task
                  key={e}
                  addLocalSTR={addLocalSTR}
                  task={task}
                  e={e}
                  setDay={setToday}
                  day="today"
                />
              );
            })}
        </>
      </div>
      <div className="tomorrow">
        <>
          {tomorrows && <h1>Ertaga</h1>}
          {tomorrows &&
            tomorrows.map((task, e) => {
              return (
                <Task
                  key={e}
                  addLocalSTR={addLocalSTR}
                  task={task}
                  e={e}
                  setDay={setTomorrow}
                  day="tomorrows"
                />
              );
            })}
        </>
      </div>
      <div className="afterTomorrows">
        <>
          {afterTomorrows && <h1>Keyin</h1>}
          {afterTomorrows &&
            afterTomorrows.map((task, e) => {
              return (
                <Task
                  key={e}
                  addLocalSTR={addLocalSTR}
                  task={task}
                  e={e}
                  setDay={setAfterTomorrow}
                  day="afterTomorrows"
                />
              );
            })}
        </>
      </div>
      <div className="statistics">
        <span className="number-completed">Bajarilganlar soni: {counts.y}</span>
        <span className="number-uncompleted">
          Bajarilmaganlar soni: {counts.n}
        </span>
      </div>
    </div>
  );
}

export default App;
