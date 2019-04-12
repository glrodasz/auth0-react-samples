import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createAuth0Client from "@auth0/auth0-spa-js";
import { Container } from "reactstrap";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Callback from "./views/Callback";
import Loading from "./components/Loading";

// auth0 config
import config from "./auth_config";

// styles
import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

class App extends Component {
  state = { auth0: null, isAuthenticated: false };

  async componentDidMount() {
    try {
      const auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        scope: "openid profile email"
      });

      const isAuthenticated =  await auth0.isAuthenticated();
      console.log('isAuthenticated', isAuthenticated);

      this.setState({ auth0, isAuthenticated });
    } catch (error) {
      console.error(error);
    }
  }

  handleLoginClick = async () => {
    const { auth0 } = this.state;

    try {
      await auth0.loginWithRedirect({
        redirect_uri: `${window.location.origin}/callback`
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleLogoutClick = async event => {
    event && event.preventDefault();
    const { auth0 } = this.state;

    auth0.logout({ returnTo: window.location.origin });
  };

  render() {
    const { auth0, isAuthenticated } = this.state;

    if (!auth0) {
      return <Loading />;
    }

    return (
      <Router>
        <div id="app">
          <NavBar
            handleLoginClick={this.handleLoginClick}
            handleLogoutClick={this.handleLogoutClick}
            isAuthenticated={isAuthenticated}
          />
          <Container className="mt-5">
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/callback" render={() => <Callback auth0={auth0} />} />
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
