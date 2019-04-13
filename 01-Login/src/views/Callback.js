import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

import Loading from "../components/Loading";

class Callback extends Component {
  state = { loading: true };

  async componentDidMount() {
    const { auth0, history } = this.props;

    try {
      await auth0.handleRedirectCallback();
      // this.setState({ loading: false });
      const isAuthenticated = await auth0.isAuthenticated();
      const user = await auth0.getUser();

      console.log("c isAuthenticated", isAuthenticated);
      console.log("c user", user);
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
