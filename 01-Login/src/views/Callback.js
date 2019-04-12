import React, { Component } from "react";
import { createBrowserHistory } from 'history';

import Loading from "../components/Loading";

const history = createBrowserHistory();

class Callback extends Component {
  async componentDidMount() {
    const { auth0 } = this.props;

    try {
      await auth0.handleRedirectCallback();
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return <Loading />;
  }
}

export default Callback;
