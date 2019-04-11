import React, { Component } from "react";

// import "jquery";
// import "samples-bootstrap-theme";
import "samples-bootstrap-theme/dist/css/auth0-theme.css";

// import logo from "./logo.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import initFontAwesome from "./utils/initFontAwesome";

import { Container } from "reactstrap";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

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
