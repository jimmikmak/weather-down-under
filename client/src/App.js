import React from "react";
import { useState } from "react";
import "./App.css";
import { Forecast } from "./components/Forecast/Forecast";
import { UserForm } from "./components/User/UserForm";
import { BookmarksList } from "./components/BookmarksList/BookmarksList";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {!loggedIn && <UserForm setLoggedIn={setLoggedIn} />}
        {/* find the syntax for Link and add a link for a user to click login */}

        {
          // commented out for now
          /* <Link to="/login" exact component={UserForm}></Link> */
        }
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
