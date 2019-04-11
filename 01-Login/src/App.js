import React, { Component } from "react";

import "samples-bootstrap-theme/dist/css/auth0-theme.css";

import { Container } from "reactstrap";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

class App extends Component {
  render() {
    return (
      <div id="app">
        <NavBar />
        <Container className="mt-5">
          <Home />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
