import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../contexts/App.context";

import "./Todo-item.styles.scss";
import { Checkbox } from "./checkbox/checkbox.component";
export function TodoItem({ text, id, done }) {
  const {
    todoActions: { deleteItem, updateText, updateDone },
  } = useContext(AppContext);
  const textInputRef = useRef();
  const [allowModify, setAllowModify] = useState(false);

  const toggleAllowModify = () => {
    setAllowModify((v) => !v);
    textInputRef.current.value = text;
  };

  const toggleChecked = () => {
    const oldDone = done;
    updateDone(id, oldDone);
  };

  const updateLocalText = () => {
    const newValue = textInputRef.current.value.trim();
    if (newValue !== text) {
      updateText({ id, text: newValue, done });
    }
    toggleAllowModify();
  };

  const deleteItemLocal = () => {
    deleteItem(id, done);
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
          <button className="ok" onClick={updateLocalText}>
            valider
          </button>
        </div>
      </div>

      <div className="btns-wrapper">
        <button class="delete-btn _3d-btn" onClick={deleteItemLocal}>
          x
        </button>

        <button className="update-btn" onClick={toggleAllowModify}>
          {(allowModify && "annuler") || "modifier"}
        </button>
      </div>
    </div>
  );
}
