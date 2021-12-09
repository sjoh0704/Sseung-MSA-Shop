import React from "react";
import { Container } from "react-bootstrap";
function NotFound({ history }) {
    return (
        <Container
            style={{ marginTop: 200, marginBottom: 200 }}
            className={"text-center"}
            fluid
        >
            <h1>404 not found</h1>
        </Container>
    );
}

export default NotFound;
