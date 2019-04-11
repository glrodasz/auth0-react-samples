import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import Highlight from "./Highlight";

class Profile extends Component {
  render() {
    const { profile } = this.props;
    return (
      <Container>
        <Row className="align-items-center profile-header">
          <Col md={2}>
            <img
              src={profile.picture}
              alt="Profile"
              class="rounded-circle img-fluid profile-picture"
            />
          </Col>
          <Col md>
            <h2>{profile.name}</h2>
            <p class="lead text-muted">{profile.email}</p>
          </Col>
        </Row>
        <Row>
          <Highlight>{JSON.stringify(profile, null, 2)}</Highlight>
        </Row>
      </Container>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string
  })
};

Profile.defaultProps = {
  profile: {
    name: "Guillermo Rodas",
    email: "glrodasz@gmail.com",
    picture: "https://www.gravatar.com/avatar/fad941dcdbf2d688be87c8164c85b144?s=500"
  }
};

export default Profile;
