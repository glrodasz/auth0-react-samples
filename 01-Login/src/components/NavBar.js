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
  state = { isOpen: false };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, profile, handleLoginClick, handleLogoutClick } = this.props;

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
                      onClick={handleLoginClick}
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
                      <DropdownItem href="#" id="qsLogoutBtn" onClick={handleLogoutClick}>
                        <span className="icon icon-power" /> Log out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button id="qsLoginBtn" color="primary" block onClick={handleLoginClick}>
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <span className="user-info">
                      <img
                        src={profile.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block"
                      />
                      <h6 className="d-inline-block">{profile.name}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <span className="icon icon-profile" />
                    <a href="/profile">Profile</a>
                  </NavItem>
                  <NavItem>
                    <span className="icon icon-power" />
                    <a id="qsLogoutBtn" href="#" onClick={handleLogoutClick}>
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
  handleLoginClick: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
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
