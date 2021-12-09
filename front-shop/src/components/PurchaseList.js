import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import Title from "./Title";
import { useSelector } from "react-redux";
import placeholder from "../assets/images/placeholder2.jpg";
import good from "../assets/images/good.png";
import bad from "../assets/images/bad.png";

import EmptyCheck from "./EmptyCheck";
import { CategoryDirection } from "./CategoryBanner";
import { setMoney, setDate } from "./Convenient";
import Modal from "./Modal";
import Rating from "./Rating";

function PurchaseList({ history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    var products = [];
    const [orders, setOrders] = useState([]);
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));
    const [flag, setFlag] = useState(true);

    const fetchUserInfo = async (userId, orderId) => {
        let res = await axios.get("/apis/v1/user/" + userId);
        setModalOpen(true);
        let data = res.data.payload;
        setModalContents(
            <Container>
                <Rating user={data}></Rating>
                <Row style={{ marginTop: 20 }}>
                    <Col>이메일: {data.useremail}</Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col>계정 생성일: {setDate(data.created_at)}</Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col
                        lg={{ span: 4, offset: 2 }}
                        sm={{ span: 4, offset: 2 }}
                        xs={{ span: 4, offset: 2 }}
                    >
                        <img
                            style={{ width: 30, height: 30 }}
                            src={good}
                            onClick={() => evaluateSellerGood(userId, orderId)}
                        ></img>
                        <button
                            style={{ background: "white", color: "green" }}
                            onClick={() => evaluateSellerGood(userId, orderId)}
                        >
                            좋아요!
                        </button>
                    </Col>
                    <Col lg={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>
                        <img
                            style={{ width: 30, height: 30 }}
                            src={bad}
                            onClick={() => evaluateSellerBad(userId, orderId)}
                        ></img>
                        <button
                            style={{ background: "white", color: "red" }}
                            onClick={() => evaluateSellerBad(userId, orderId)}
                        >
                            싫어요!
                        </button>
                    </Col>
                </Row>
            </Container>
        );
    };

    const evaluateSellerGood = async (userId, orderId) => {
        await axios.get(`/apis/v1/ratings/${userId}/up`);
        await axios.post(`/apis/v1/order/${orderId}`, { rating_check: true });

        setModalOpen(false);
        setFlag(!flag);
    };
    const evaluateSellerBad = async (userId, orderId) => {
        await axios.get(`/apis/v1/ratings/${userId}/down`);
        await axios.post(`/apis/v1/order/${orderId}`, { rating_check: true });
        setModalOpen(false);
        setFlag(!flag);
    };

    const fetchOrders = async () => {
        let res = await axios.get("/apis/v1/order/" + userData.user_id);
        let tmp_order = res.data.payload.filter(
            (order) => order.sales_stage == "SO"
        );

        let orderlist = tmp_order.map((order, index) => {
            return (
                <ListGroup.Item key={index}>
                    <Row style={{ margin: 30 }}>
                        <Col sm="6" lg="5" xs="12">
                            <img
                                style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    height: "auto",
                                }}
                                src={
                                    order.base64_image_url
                                        ? order.base64_image_url
                                        : placeholder
                                }
                            ></img>
                        </Col>
                        <Col sm="6" lg={{ span: 6, offset: 1 }} xs="12">
                            <div style={{ paddingTop: 10 }}>
                                <p
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {order.name}
                                </p>
                                <p style={{ fontSize: "1.3rem" }}>
                                    구매량: {order.demand_quantity}
                                </p>
                                <p style={{ fontSize: "1.3rem" }}>
                                    지불 금액: {setMoney(order.price)} ₩
                                </p>
                                <p style={{ fontSize: "1.3rem" }}>
                                    주문 날짜: {setDate(order.created_at)}
                                </p>
                                {!order.rating_check ? (
                                    <div>
                                        <p
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "blue",
                                            }}
                                        >
                                            판매자의 매너를 평가해볼까요?
                                        </p>
                                        <button
                                            className="emptyButton"
                                            onClick={() =>
                                                fetchUserInfo(
                                                    order.seller_id,
                                                    order.order_id
                                                )
                                            }
                                            style={{
                                                height: "4rem",
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            매너 평가하기
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "green",
                                            }}
                                        >
                                            매너 평가를 완료했습니다.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        });

        setOrders(orderlist);
    };

    useEffect(() => {
        fetchOrders();
    }, [userData.user_id, flag]);

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>

            <Container>
                <CategoryDirection tag1={"구매 목록"}></CategoryDirection>
                <EmptyCheck
                    text={"구매한 상품이 없습니다"}
                    items={orders}
                ></EmptyCheck>
            </Container>
        </div>
    );
}

export default PurchaseList;
