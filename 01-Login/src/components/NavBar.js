import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false, isAuthenticated: true };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated } = this.state;
    const { profile } = this.props;

    return (
      <div className="nav-container">
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand className="logo" />
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                    >
                      Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <img
                        src={profile.picture}
                        alt="Profile"
                        className="nav-user-profile"
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem header>{profile.name}</DropdownItem>
                      <DropdownItem
                        href="/profile"
                        className="dropdown-profile"
                      >
                        <span className="icon icon-profile" /> Profile
                      </DropdownItem>
                      <DropdownItem href="#" id="qsLogoutBtn">
                        <span class="icon icon-power" /> Log out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button id="qsLoginBtn" color="primary" block>
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <span class="user-info">
                      <img
                        src={profile.picture}
                        alt="Profile"
                        class="nav-user-profile d-inline-block"
                      />
                      <h6 class="d-inline-block">{profile.name}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <span class="icon icon-profile" />
                    <a href="/profile">Profile</a>
                  </NavItem>
                  <NavItem>
                    <span class="icon icon-power" />
                    <a id="qsLogoutBtn" href="#">
                      Log out
                    </a>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string
  })
};

NavBar.defaultProps = {
  profile: {
    name: "Guillermo Rodas",
    picture:
      "https://www.gravatar.com/avatar/fad941dcdbf2d688be87c8164c85b144?s=500"
  }
};

export default NavBar;
