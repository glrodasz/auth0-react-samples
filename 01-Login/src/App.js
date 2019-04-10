import React, { Component } from "react";

// import "jquery";
// import "samples-bootstrap-theme";
import "samples-bootstrap-theme/dist/css/auth0-theme.css";

// import logo from "./logo.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import initFontAwesome from './utils/initFontAwesome';
import NavBar from './components/NavBar';

initFontAwesome();

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
