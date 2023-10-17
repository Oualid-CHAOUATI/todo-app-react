import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/App.context";

import "./Todo-item.styles.scss";
import { Checkbox } from "./checkbox/checkbox.component";
export function TodoItem({ text, id, done }) {
  const {
    todoActions: { updateTodoItem, removeTodoItem },
  } = useContext(AppContext);
  const textInputRef = useRef();
  const [allowModify, setAllowModify] = useState(false);

  const toggleAllowModify = () => {
    setAllowModify((v) => !v);
    textInputRef.current.value = text;
  };

  const toggleChecked = () => {
    console.log("done in toggleChecked");
    console.log(done);
    updateTodoItem({ id, done: Boolean(!done) });
  };

  const updateText = () => {
    const newValue = textInputRef.current.value.trim();
    if (newValue !== text) {
      updateTodoItem({ id, text: newValue });
    }
    toggleAllowModify();
  };

  const deleteItem = () => {
    removeTodoItem(id);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      textInputRef.current.value = text;
    });

    return () => clearTimeout(timer);
  }, [text]);
  return (
    <div key={id} className="todo-item">
      <div className="label-wrapper">
        <Checkbox checked={done} onChange={toggleChecked} />
        <div
          className="text-input-wrapper"
          data-allow-modify={allowModify || null}
        >
          <input className="text-input" ref={textInputRef} />
          <button className="ok" onClick={updateText}>
            Ok
          </button>
        </div>
      </div>

      <div className="btns-wrapper">
        <button className="delete-btn" onClick={deleteItem}>
          x
        </button>
        <button className="update-btn" onClick={toggleAllowModify}>
          modifier
        </button>
      </div>
    </div>
  );
}
