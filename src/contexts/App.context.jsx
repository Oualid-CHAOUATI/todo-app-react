import React, { useState } from "react";

const INITIAL_STATE = {
  todoList: [],

  todoActions: {
    addTodoItem: (text) => null,
    removeTodoItem: (id) => null,
    updateTodoItem: ({ id, text = null, done = null }) => null,
  },
};

export const AppContext = React.createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  // const [todoList, setTodoList] = useState([]);
  const [todoList, setTodoList] = useState([
    { id: 1, text: "haha", done: false },
  ]);

  const addTodoItem = (text) => {
    const id = `${Math.random()}${Date.now()}`;

    setTodoList((todoList) => [...todoList, { id, text, done: false }]);
  };

  const removeTodoItem = (id) => {
    const newList = todoList.filter((item) => item.id != id);
    setTodoList(newList);
  };

  const updateTodoItem = ({ id, text = null, done = null }) => {
    const selected = todoList.find((item) => item.id == id);

    console.log(selected);

    if (selected) {
      text ? (selected.text = text) : null;
      done != null ? (selected.done = done) : null;
      setTodoList([...todoList]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        todoActions: { addTodoItem, removeTodoItem, updateTodoItem },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
