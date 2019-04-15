import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createAuth0Client from "@auth0/auth0-spa-js";
import { Container } from "reactstrap";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Callback from "./views/Callback";
import Loading from "./components/Loading";
import debugUtils, { debugRender } from "./utils/debugUtils";

// auth0 config
import config from "./auth_config";

// styles
import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

class App extends Component {
  state = { loading: true, auth0: null };

  async componentDidMount() {
    try {
      const auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
      });

      await debugUtils(auth0)(App)("componentDidMount");

      this.setState({ loading: false, auth0 });
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
    debugRender(App);
    const { loading, auth0 } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div id="app">
        <Router>
          <Route
            path={["/", "/profile"]}
            exact
            render={() => (
              <NavBar
                handleLoginClick={this.handleLoginClick}
                handleLogoutClick={this.handleLogoutClick}
                auth0={auth0}
              />
            )}
          />
          <Container className="mt-5">
            <Route path="/" exact component={Home} />
            <Route
              path="/profile"
              render={props => <Profile auth0={auth0} {...props} />}
            />
          </Container>
          <Footer />
          <Route
            path="/callback"
            render={props => <Callback auth0={auth0} {...props} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
