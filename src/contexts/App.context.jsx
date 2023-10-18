import React, { useState } from "react";

const INITIAL_STATE = {
  todoList: [],
  completedList: [],

  todoActions: {
    createItem: (text) => null,
    deleteItem: (id, done) => null,
    updateText: (id, text, done) => null,
    updateDone: (id, oldDone) => null,
  },
};

export const AppContext = React.createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const createItem = (text) => {
    const id = `${Math.random()}${Date.now()}`;
    _addToTodoList({ id, text });
  };

  const _addToTodoList = ({ id, text }) => {
    setTodoList([...todoList, { id, text, done: false }]);
  };

  const _addToCompletedList = ({ id, text }) => {
    setCompletedList([...completedList, { id, text, done: true }]);
  };

  const _deleteItemFromCompleted = (id) => {
    _deleteItemFromAList(id, completedList, setCompletedList);
  };

  const _deleteItemFromTodo = (id) => {
    _deleteItemFromAList(id, todoList, setTodoList);
  };

  const _deleteItemFromAList = (id, list, setList) => {
    // debugger;
    const newList = list.filter((item) => item.id != id);
    if (newList.length !== list.length) {
      setList(newList);
    }
  };
  const deleteItem = (id, done) => {
    if (done) _deleteItemFromCompleted(id);
    _deleteItemFromTodo(id);
  };

  const findItem = (id, list) => {
    return list.find((item) => item.id == id);
  };

  const updateText = ({ id, text, done }) => {
    // debugger;
    const [list, setList] = done
      ? [completedList, setCompletedList]
      : [todoList, setTodoList];

    const selected = findItem(id, list);
    console.log("selected");
    console.log(selected);
    if (selected) {
      selected.text = text;
      setList([...list]);
    }
  };

  const updateDone = (id, oldDone) => {
    const [listWhereItemIs, addFunction, deleteFuntion] = oldDone
      ? [completedList, _addToTodoList, _deleteItemFromCompleted]
      : [todoList, _addToCompletedList, _deleteItemFromTodo];

    const item = findItem(id, listWhereItemIs);
    // const item = findItem(id, todoList) || findItem(id, completedList);
    if (!item) return;
    addFunction(item);
    deleteFuntion(item.id);
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        completedList,
        todoActions: { createItem, deleteItem, updateText, updateDone },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
