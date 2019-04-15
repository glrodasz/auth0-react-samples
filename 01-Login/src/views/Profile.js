import React, { Component } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"

import Highlight from "../components/Highlight"
import Loading from "../components/Loading"
import debugUtils, { debugRender } from "../utils/debugUtils"

class Profile extends Component {
  state = { loading: true, profile: {} }

  async componentDidMount() {
    const { auth0 } = this.props

    try {
      await debugUtils(auth0)(Profile)("componentDidMount")
      const isAuthenticated = await auth0.isAuthenticated()
      const profile = await auth0.getUser()

      if (!isAuthenticated) {
        await auth0.loginWithRedirect({
          redirect_uri: `${window.location.origin}/callback`,
          appState: { targetUrl: '/profile' }
        })
      } else {
        this.setState({ loading: false, profile })
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    debugRender(Profile)
    const { loading, profile } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <Container>
        <Row className="align-items-center profile-header">
          <Col md={2}>
            <img
              src={profile.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture"
            />
          </Col>
          <Col md>
            <h2>{profile.name}</h2>
            <p className="lead text-muted">{profile.email}</p>
          </Col>
        </Row>
        <Row>
          <Highlight>{JSON.stringify(profile, null, 2)}</Highlight>
        </Row>
      </Container>
    )
  }
}

Profile.propTypes = {
  auth0: PropTypes.object.isRequired
}

export default Profile
