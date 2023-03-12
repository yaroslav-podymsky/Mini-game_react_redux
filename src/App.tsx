import React from "react";
import "./App.css";
import Field from "./components/field/field";
import PathDrawing from "./components/path_drawing/path_drawing";

function App() {
  return (
    <div className="app">
      <p className="app_title">Labyrinth</p>
      <Field />
      <PathDrawing />
    </div>
  );
}

export default App;
