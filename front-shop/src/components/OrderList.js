import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import Title from "./Title";
import { useSelector } from "react-redux";
import placeholder from "../assets/images/placeholder2.jpg";
import EmptyCheck from "./EmptyCheck";
import { CategoryDirection } from "./CategoryBanner";
import { setMoney, setDate } from "./Convenient";
import Modal from "./Modal";

function OrderList({ history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    const [flag, setFlag] = useState(true);
    const [orders, setOrders] = useState([]);
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    const fetchOrders = async () => {
        await axios.get("/apis/v1/order/" + userData.user_id).then((res) => {
            console.log(res.data.payload);
            let tmp_orders = res.data.payload.filter(
                (order) => order.sales_stage != "SO"
            );
            let orderlist = tmp_orders.map((order, index) => {
                return (
                    <ListGroup.Item key={index}>
                        <Row style={{ padding: 10 }}>
                            <Col sm="6" lg="5" xs="12">
                                <img
                                    style={{
                                        height: "auto",
                                        maxWidth: "100%",
                                        padding: 10,
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
                                        주문 수량: {order.demand_quantity}
                                    </p>
                                    <p style={{ fontSize: "1.3rem" }}>
                                        지불 금액: {setMoney(order.price)} ₩
                                    </p>
                                    <p style={{ fontSize: "1.3rem" }}>
                                        주문일: {setDate(order.created_at)}
                                    </p>
                                    <p style={{ fontSize: "1.4rem" }}>
                                        주문 상태:{" "}
                                        {order.sales_stage == "S" ? (
                                            <span style={{ color: "red" }}>
                                                판매자의 확인을 기다려주세요
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                예약되었습니다! 판매자와
                                                거래하세요
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <Row>
                                    <Col lg="6" xs="12">
                                        <div className="d-grid gap-2">
                                            <button
                                                className="emptyButton"
                                                style={{
                                                    height: 40,
                                                    fontSize: "1.3rem",
                                                    marginTop: 10,
                                                }}
                                                onClick={() => {
                                                    connectSeller(
                                                        order.seller_id
                                                    );
                                                }}
                                            >
                                                판매자에게 연락하기
                                            </button>
                                        </div>
                                    </Col>
                                    <Col lg="6" xs="12">
                                        <div className="d-grid gap-2">
                                            <button
                                                className="filledButton"
                                                style={{
                                                    height: 40,
                                                    fontSize: "1.3rem",
                                                    marginTop: 10,
                                                }}
                                                onClick={() => {
                                                    onDeleteOrder(
                                                        order.order_id
                                                    );
                                                }}
                                            >
                                                주문 취소하기
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <br />
                        </Row>
                    </ListGroup.Item>
                );
            });
            setOrders(orderlist);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, [userData.user_id, flag]);

    const connectSeller = async (seller_id) => {
        let res = await axios.get(`/apis/v1/user/${seller_id}`);
        let tmp = res.data.payload.phone_number;
        let phone_number =
            tmp.slice(0, 3) + "-" + tmp.slice(3, 7) + "-" + tmp.slice(7, 11);
        setModalOpen(true);
        setModalContents(`[${phone_number}]로 연락해주세요!`);
    };

    const onDeleteOrder = (order_id) => {
        axios
            .delete(`/apis/v1/order/${order_id}`)
            .then((res) => {
                alert("주문이 취소되었습니다.");
                setFlag(!flag);
            })
            .catch((e) => {
                alert("문제가 발생했습니다. 관리자에게 문의해주세요");
            });
    };

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <Container>
                <CategoryDirection tag1={"주문 목록"}></CategoryDirection>

                <EmptyCheck
                    text={"주문한 상품이 없습니다"}
                    items={orders}
                ></EmptyCheck>
            </Container>
        </div>
    );
}

export default OrderList;
