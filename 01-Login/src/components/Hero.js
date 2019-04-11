import React, { Component } from "react";

import logo from "../logo.svg";

class Hero extends Component {
  render() {
    return (
      <div className="text-center hero">
        <img className="mb-3 app-logo" src={logo} alt="React logo" />
        <h1 className="mb-4">React.js Sample Project</h1>

        <p class="lead">
          This is a sample application that demonstrates an authentication flow
          for an SPA, using <a href="https://reactjs.org">React.js</a>
        </p>
      </div>
    );
  }
}

export default Hero;
