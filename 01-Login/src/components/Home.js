import React, { Component, Fragment } from "react";

import Hero from "./Hero";
import Content from "./Content";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Hero />
        <hr />
        <Content />
      </Fragment>
    );
  }
}

export default Home;
