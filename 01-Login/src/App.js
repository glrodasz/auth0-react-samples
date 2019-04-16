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

function withAuthentication(WrappedComponent, auth0) {
  return class extends React.Component {
    state = { loading: true };

    async componentDidMount() {
      const { path } = this.props;
      const isAuthenticated = await auth0.isAuthenticated();

      if (!isAuthenticated) {
        await auth0.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          appState: { targetUrl: path }
        });
      }

      this.setState({ loading: false });
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <Loading />;
      }

      return <WrappedComponent auth0={auth0} {...this.props} />;
    }
  };
}

function PrivateRoute({ component: Component, path, auth0, ...rest }) {
  const ComponentWithAuthentication = withAuthentication(Component, auth0);
  const render = props => (
    <ComponentWithAuthentication path={path} {...props} />
  );

  return <Route path={path} render={render} {...rest} />;
}

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
                auth0={auth0}
                handleLoginClick={this.handleLoginClick}
                handleLogoutClick={this.handleLogoutClick}
              />
            )}
          />
          <Container className="mt-5">
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" auth0={auth0} component={Profile} />
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
