import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/App.context";

import "./Display.styles.scss";
import { DisplayList } from "./Display-list/Display-list.component";
export function Display() {
  const { todoList, completedList } = useContext(AppContext);
  const [activeBtn, setActiveBtn] = useState("todo");

  const tabsSetters = {
    showTodo: () => setActiveBtn("todo"),
    showCompleted: () => setActiveBtn("completed"),
  };

  const doneNumber = completedList.length;
  const totalNumber = todoList.length + completedList.length;
  let percentage =
    totalNumber == 0 ? 0 : ((100 * doneNumber) / totalNumber).toFixed(2);
  percentage = parseFloat(percentage);

  const showPercentage = () => {
    if (totalNumber == 0) return <span> add a task</span>;
    if (percentage == 100) return <span> BRAVO</span>;
    return <span> Continue</span>;
  };
  return (
    <div className="display">
      <h2 className="title">Your todoList</h2>

      <h3 className="percentage">
        {percentage}% is done
        {showPercentage()}
      </h3>

      <div className="tabs-wrapper">
        <button
          className={activeBtn == "todo" ? "active" : null}
          onClick={tabsSetters.showTodo}
        >
          Todo
        </button>
        <button
          className={activeBtn == "completed" ? "active" : null}
          onClick={tabsSetters.showCompleted}
        >
          completed
        </button>
      </div>
      <div className="lists-wrapper">
        <div className={activeBtn == "todo" ? "show" : null}>
          <h2 className="title">Todo</h2>
          <DisplayList list={todoList} />
        </div>
        <div className={activeBtn == "completed" ? "show" : null}>
          <h2 className="title">Completed</h2>
          <DisplayList list={completedList} />
        </div>
      </div>
    </div>
  );
}
