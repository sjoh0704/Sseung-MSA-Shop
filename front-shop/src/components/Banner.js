import React from "react";
import {
    Container,
    Row,
    Col,
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
    InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import bucket from "../assets/images/bucket.png";
const Banner = () => {
    return (
        <div style={{ paddingBottom: 30 }}>
            <hr />

            <Container>
                <Row>
                    <Col
                        lg={{ span: 3, offset: 0 }}
                        sm={{ span: 3, offset: 0 }}
                    >
                        <Navbar.Brand href="#home">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <img src={bucket} style={{ width: 70 }}></img>
                            </Link>
                        </Navbar.Brand>
                    </Col>
                </Row>

                <Form>
                    <Row className="align-items-center">
                        <Col lg={{ span: 3 }} sm={{ span: 12 }} xs="12">
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <h2 style={{ color: "black" }}>
                                    My Shopping Mall
                                </h2>
                            </Link>
                        </Col>
                        <Col lg={{ span: 6 }} sm={{ span: 9 }} xs="9">
                            <Form.Control
                                size="lg"
                                id="inlineFormInputName"
                                placeholder="검색어를 입력하세요"
                            />
                        </Col>
                        <Col lg={{ span: 3 }} sm={{ span: 3 }} xs="3">
                            <button
                                className="emptyButton"
                                style={{
                                    width: "5em",
                                    height: 50,
                                    fontSize: "1.3rem",
                                }}
                            >
                                Search
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default Banner;
