import React from "react";
import { useState } from "react";
import { Forecast } from "./components/Forecast/Forecast";
import { FiveDayForecast } from "./components/FiveDayForecast/FiveDayForecast";
import { UserForm } from "./components/User/UserForm";
import { BookmarksList } from "./components/BookmarksList/BookmarksList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {!loggedIn && <UserForm setLoggedIn={setLoggedIn} />}
        <Switch>
          <Route exact path="/login">
            <UserForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/forecast">
            <Forecast loggedIn={loggedIn} />
          </Route>
          <Route exact path="/bookmarks">
            <BookmarksList />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
