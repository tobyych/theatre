import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import Room from "./room/Room";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="base-layout">
          <nav className="navbar">
            <ul>
              <Link className="link" to="/">
                Home
              </Link>
              <Link className="link" to="/about">
                About
              </Link>
            </ul>
          </nav>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/room">
              <Room />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

export default App;
