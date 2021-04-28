import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/Forecast";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <header className="App-header">
            <h1>Weather Down Under</h1>
          </header>
          <main>
            <Forecast />
          </main>
          <footer>Page created by James McCarron</footer>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
