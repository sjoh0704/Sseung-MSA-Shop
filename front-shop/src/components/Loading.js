import react from "react";
import DisplayProducts from "./MakeCard";
import { Container, Spinner, Row, Col } from "react-bootstrap";
const Loading = ({ products }) => {
    if (products.length == 0)
        return (
            <Container>
                <Row>
                    <Col
                        lg={{ span: 2, offset: 5 }}
                        xs={{ span: 3, offset: 5 }}
                        md={{ span: 6, offset: 5 }}
                    >
                        <Spinner
                            style={{
                                marginTop: 100,
                                marginBottom: 100,
                                width: 50,
                                height: 50,
                            }}
                            animation="border"
                            variant="primary"
                        ></Spinner>
                    </Col>
                </Row>
            </Container>
        );
    return (
        <div>
            <div style={{ marginTop: 30 }} />
            <DisplayProducts products={products} />
        </div>
    );
};

export default Loading;
