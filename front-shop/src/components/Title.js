import React from "react";
import { Col, Container, Row } from "react-bootstrap";
function Title({ title, set_middle = true }) {
    return (
        <Container>
            <br />
            <br />
            <h1>
                <div></div>

                <Row className={set_middle ? "justify-content-md-center" : ""}>
                    <Col xs lg={set_middle ? "10" : "12"}>
                        {title}
                        <hr />
                    </Col>
                </Row>
            </h1>

            <br />
            <br />
        </Container>
    );
}

export default Title;
