import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";

import { Container } from "reactstrap";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Callback from "./components/Callback";

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <NavBar />
          <Container className="mt-5">
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/callback" component={Callback} />
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
