import React, { useContext } from "react";
import { AppContext } from "../../contexts/App.context";
import { TodoItem } from "../Todo-item/Todo-item.component";

import "./Display.styles.scss";
import { DisplayList } from "./Display-list/Display-list.component";
export function Display() {
  const { todoList } = useContext(AppContext);

  const todoListDone = [];
  const todoListUnDone = [];

  todoList.forEach((item) => {
    item.done ? todoListDone.push(item) : todoListUnDone.push(item);
  });

  const doneNumber = todoListDone.length;
  const totalNumber = todoList.length;
  let percentage =
    totalNumber == 0 ? 0 : ((100 * doneNumber) / totalNumber).toFixed(2);
  percentage = parseFloat(percentage);

  const showPercentage = () => {
    if (totalNumber == 0) return null;
    if (percentage == 100) return null;
    return <span className="continue"> Continue</span>;
  };
  return (
    <div className="display">
      <h2 className="title">Your todoList</h2>

      <h3 className="percentage">
        {percentage}% is done
        {showPercentage()}
      </h3>
      <div className="lists-wrapper">
        <div>
          <h2 className="title">Todo</h2>
          <DisplayList list={todoListUnDone} />
        </div>
        <div>
          <h2 className="title">Completed</h2>
          <DisplayList list={todoListDone} />
        </div>
      </div>
    </div>
  );
}
