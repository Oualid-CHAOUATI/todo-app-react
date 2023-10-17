import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/App.context";
import "./CreateTodoForm.styles.scss";
export function CreateTodoForm() {
  const inputRef = useRef(null);

  const {
    todoActions: { addTodoItem },
  } = useContext(AppContext);

  const handleAdd = (event) => {
    event.preventDefault();

    const text = inputRef.current.value.trim();

    if (text !== "") {
      addTodoItem(text);
      inputRef.current.value = "";
    }
  };
  return (
    <div className="todo-form-wrappper">
      <h2 className="title">Add a todo</h2>
      <form onSubmit={handleAdd}>
        <div className="input-wrapper">
          <input ref={inputRef} />
          <button>Add</button>
        </div>
      </form>
    </div>
  );
}
