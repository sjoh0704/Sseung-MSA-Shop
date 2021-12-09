import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import EmptyBox from "../assets/images/box.png";
import MakeCard from "./MakeCard";
const EmptyCheck = ({ text, items }) => {
    if (items.length == 0) {
        return (
            <Row>
                <Col
                    lg={{ span: 6, offset: 3 }}
                    sm={{ span: 9, offset: 1 }}
                    xs={{ span: 12 }}
                >
                    <p style={{ fontSize: "2rem", marginTop: 50 }}>{text}</p>
                    <img
                        style={{ margin: 100, maxWidth: "50%", height: "auto" }}
                        src={EmptyBox}
                    ></img>
                </Col>
            </Row>
        );
    } else {
        return <ListGroup>{items}</ListGroup>;
    }
};

export function EmptyCheckProductByCategory({ text, items }) {
    if (items.length == 0) {
        return (
            <Row>
                <Col lg={{ span: 6, offset: 3 }} sm={{ span: 12, offset: 0 }}>
                    <p style={{ fontSize: "2rem", marginTop: 50 }}>{text}</p>
                    <img
                        style={{ margin: 100, maxWidth: "50%", height: "auto" }}
                        src={EmptyBox}
                    ></img>
                </Col>
            </Row>
        );
    } else {
        return <MakeCard products={items}></MakeCard>;
    }
}

export default EmptyCheck;
