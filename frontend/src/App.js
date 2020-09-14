import React from "react";

import "./App.css";

import Program from "./components/Program/Program";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import { Provider } from "react-redux";
import store from "./redux/Store";

import Welcome from "./components/Welcome/Welcome";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import withAuth from "./components/withAuth";

const AuthenticatedWelcome = withAuth(Welcome);
const AuthenticatedProgram = withAuth(Program);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <Nav /> */}

          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/welcome">
              <AuthenticatedWelcome />
            </Route>

            <Route exact path="/">
              {/* <Test /> */}
            </Route>

            <Route exact path="/program">
              <AuthenticatedProgram />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
