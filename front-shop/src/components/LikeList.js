import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import Title from "./Title";
import { useSelector } from "react-redux";
import EmptyCheck from "./EmptyCheck";
import { Link } from "react-router-dom";
import { CategoryDirection } from "./CategoryBanner";
import { setDate, setMoney } from "./Convenient";

function Likes({ history }) {
    const [carts, setCarts] = useState([]);
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    const fetchCarts = async () => {
        let res = await axios.get("/apis/v1/carts/users/" + userData.user_id);
        let cartList = res.data.payload;
        let res_product = await axios.get("/apis/v1/product");

        let productList = res_product.data.payload;
        cartList = cartList.map((cart, index) => {
            console.log(productList);
            const tmp_product = productList.find(
                (product) => product.pk == cart.productId
            );
            if (!tmp_product) {
                return;
            }
            let path = `/product/${tmp_product.pk}`;
            return (
                <div>
                    <Link
                        to={path}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <ListGroup.Item key={index}>
                            <Row style={{ margin: 30 }}>
                                <Col sm="6" lg="6" xs="12">
                                    <img
                                        style={{
                                            height: "auto",
                                            maxWidth: "100%",
                                            objectFit: "cover",
                                        }}
                                        src={tmp_product.base64_image_url}
                                    ></img>
                                </Col>
                                <Col sm="6" lg="6" xs="12">
                                    <div style={{ marginLeft: 20 }}>
                                        <p
                                            style={{
                                                fontSize: "1.5rem",
                                                fontWeight: "bold",
                                                marginLeft: 20,
                                                paddingTop: 20,
                                            }}
                                        >
                                            {tmp_product.name}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "1.3rem",
                                                marginLeft: 20,
                                            }}
                                        >
                                            남은 수량: {tmp_product.quantity}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "1.3rem",
                                                marginLeft: 20,
                                            }}
                                        >
                                            {setMoney(tmp_product.price)} ₩
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "1.3rem",
                                                marginLeft: 20,
                                            }}
                                        >
                                            찜한 날짜: {setDate(cart.createdAt)}
                                        </p>

                                        <br />
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Link>
                </div>
            );
        });

        setCarts(cartList);
    };

    useEffect(() => {
        fetchCarts();
    }, [userData.user_id]);

    return (
        <div>
            <Container>
                <CategoryDirection tag1={"찜 목록"}></CategoryDirection>

                <EmptyCheck
                    text={"찜한 상품이 없습니다"}
                    items={carts ? carts : []}
                ></EmptyCheck>
            </Container>
        </div>
    );
}

export default Likes;
