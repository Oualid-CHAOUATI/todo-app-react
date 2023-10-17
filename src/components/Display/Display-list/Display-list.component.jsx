import React from "react";
import { TodoItem } from "../../Todo-item/Todo-item.component";

export function DisplayList({ list = [] }) {
  if (list.length == 0) return <p>Your list is empty..</p>;
  else
    return (
      <div className="todoo-items">
        {list.map((item) => {
          return <TodoItem key={item.id} {...item} />;
        })}
      </div>
    );
}
