import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";

class Content extends Component {
  render() {
    return (
      <div class="next-steps">
        <h2 class="mt-5 text-center">What can I do next?</h2>
        {contentData.map(row => (
          <Row className="d-flex justify-content-between">
            {row.map(col => (
              <Col md={5}>
                <h6 class="mb-3">
                  <a href={col.link}>
                    <FontAwesomeIcon icon="link" />{col.title}
                  </a>
                </h6>
                <p>{col.description}</p>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}

export default Content;
