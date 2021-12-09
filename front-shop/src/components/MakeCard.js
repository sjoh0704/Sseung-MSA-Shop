import { Row, Col, Card } from "react-bootstrap";
import placeholder from "../assets/images/placeholder2.jpg";
import { Link } from "react-router-dom";
import { setMoney } from "./Convenient";
// id가 필요하다!!
const MakeCard = ({ products }) => {
    products = products.filter((product) => product.quantity > 0);
    products = products.map((product, index) => {
        let path = "/product/" + product.id;
        return (
            <Col lg={4} sm={6} key={index} bg={"Light"}>
                <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={index}
                    to={path}
                >
                    <Card border="secondary" style={{ height: "29rem" }}>
                        <Row>
                            <Card.Img
                                variant="top"
                                style={{ height: "22rem", objectFit: "cover" }}
                                src={
                                    product.base64_image_url
                                        ? product.base64_image_url
                                        : placeholder
                                }
                            />
                        </Row>

                        <Card.Body style={{ marginTop: 4 }}>
                            <Card.Title style={{ fontSize: "1.4rem" }}>
                                {product.name}
                            </Card.Title>
                            <Card.Text
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bolder",
                                }}
                            >
                                {setMoney(product.price)} ₩
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
                <br />
            </Col>
        );
    });
    return <Row>{products}</Row>;
};

export default MakeCard;
