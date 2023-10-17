import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CreateTodoForm } from "./components/create-todo-form/CreateTodoForm.component";
import { Display } from "./components/Display/Display.component";

function App() {
  return (
    <div>
      <CreateTodoForm />
      <Display />
    </div>
  );
}

export default App;
