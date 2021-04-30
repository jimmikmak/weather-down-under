import React from "react";
import { useState } from "react";
import "./App.css";
import { Forecast } from "./components/Forecast/Forecast";
import { UserForm } from "./components/User/UserForm";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // const logInForm = React.forwardRef((props, ref) => (
  //   <a ref={ref} {...props}>
  //     {props.children}
  //   </a>
  // ));
  return (
    <BrowserRouter>
      <div className="App">
        {/* find the syntax for Link and add a link for a user to click login */}
        <Link to="/login" exact component={UserForm}></Link>
        <Switch>
          <Route exact path="/login">
            <UserForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/forecast">
            <Forecast loggedIn={loggedIn} />
          </Route>
        </Switch>
        <header className="App-header">
          <h1>Weather Down Under</h1>
        </header>
        <main>
          <Forecast />
        </main>
        <footer>Page created by James McCarron</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
