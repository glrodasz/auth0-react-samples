import React, { Component } from "react";
import loading from "../assets/loading.svg";

class Callback extends Component {
  render() {
    return (
      <div class="spinner">
        <img src={loading} alt="Loading" />
      </div>
    );
  }
}

export default Callback;
