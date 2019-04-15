import React, { Component } from "react";

import Loading from "../components/Loading";
import debugUtils, { debugRender } from "../utils/debugUtils";

class Callback extends Component {
  async componentDidMount() {
    const { auth0, history } = this.props;

    try {
      const result = await auth0.handleRedirectCallback();
      const targetUrl = result.appState && result.appState.targetUrl;

      await debugUtils(auth0)(Callback)("componentDidMount");
      history.push(targetUrl || "/");
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    debugRender(Callback);
    return <Loading />;
  }
}

export default Callback;
