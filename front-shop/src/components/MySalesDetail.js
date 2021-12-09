import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import arrow from "../assets/images/arrow.png";
import EmptyBox from "../assets/images/box.png";
import { CategoryDirection } from "./CategoryBanner";
import { setMoney, setDate } from "./Convenient";
import Rating from "./Rating";
import Modal from "./Modal";

function MySalesDetail({ history, match }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    const [btnValue, setBtnValue] = useState("");
    const [orders, setOrders] = useState([]);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    const fetchProduct = async () => {
        let res = await axios.get("/apis/v1/product/" + match.params.number);

        setProduct({
            ...res.data.payload,
            product_id: match.params.number,
        });
        let image_list = await res.data.payload.image.map((img) => (
            <div>
                <br />
                <img
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                    }}
                    src={img}
                ></img>
                <br />
                <br />
            </div>
        ));
        setImages(image_list);
    };

    const fetchUserInfo = async (userId) => {
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
            </Container>
        );
    };

    const fetchOrders = async () => {
        let res = await axios.get("/apis/v1/order/sale/" + match.params.number);
        let tmp_orders = res.data.payload.filter(
            (order) => order.sales_stage != "SO"
        );

        console.log(tmp_orders);
        let orderlist = tmp_orders.map((order, index) => {
            let sale_status = "";
            if (order.sales_stage == "S") sale_status = "판매 중";
            else if (order.sales_stage == "SR") sale_status = "예약 중";
            else sale_status = "판매 완료";

            return (
                <ListGroup.Item key={index}>
                    <Row style={{ margin: 20 }}>
                        <Col>
                            <p style={{ fontSize: "1.5rem" }}>
                                주문자 선호 장소: {order.address}
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                연락처: {order.phone_number}
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                주문량: {order.demand_quantity}
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                가격: {setMoney(order.price)} 원
                            </p>
                            <p style={{ fontSize: "1.5rem" }}>
                                주문 일짜: {setDate(order.created_at)}
                            </p>
                        </Col>
                        <Col>
                            <Row>
                                <Row>
                                    <Col>
                                        <button
                                            className="emptyButton"
                                            onClick={() =>
                                                fetchUserInfo(order.buyer_id)
                                            }
                                            style={{
                                                height: "4rem",
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            주문자 정보 보기
                                        </button>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 20 }}>
                                    <Col lg="3" sm="4" xs="12">
                                        <div className="dropdown">
                                            <button
                                                style={{
                                                    height: "4rem",
                                                    padding: 10,
                                                    width: 100,
                                                }}
                                                className="dropdown-button "
                                            >
                                                {btnValue
                                                    ? btnValue
                                                    : sale_status}
                                            </button>
                                            <div class="dropdown-content">
                                                <a
                                                    name="예약 중"
                                                    onClick={(e) => {
                                                        onClickHandler(
                                                            {
                                                                order,
                                                                product_id:
                                                                    match.params
                                                                        .number,
                                                            },
                                                            e
                                                        );
                                                    }}
                                                >
                                                    예약 중
                                                </a>
                                                <a
                                                    name="판매 완료"
                                                    onClick={(e) => {
                                                        onClickHandler(
                                                            {
                                                                order,
                                                                product_id:
                                                                    match.params
                                                                        .number,
                                                            },
                                                            e
                                                        );
                                                    }}
                                                >
                                                    판매 완료
                                                </a>
                                                <a
                                                    name="거래 취소"
                                                    onClick={(e) => {
                                                        onClickHandler(
                                                            {
                                                                order,
                                                                product_id:
                                                                    match.params
                                                                        .number,
                                                            },
                                                            e
                                                        );
                                                    }}
                                                >
                                                    거래 취소
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6" sm="12" xs="12">
                                        <p
                                            style={{
                                                fontSize: "1.2rem",
                                                padding: 10,
                                                color: "red",
                                            }}
                                        >
                                            주문 상태를 조회해주세요!
                                        </p>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        });
        setOrders(orderlist);
    };

    useEffect(() => {
        fetchProduct();
        fetchOrders();
    }, [userData.user_id, btnValue]);

    const onClickHandler = async (orderData, e) => {
        const { product_id, order } = orderData;

        if (e.target.name === "판매 완료") {
            let data = {
                sales_stage: "SO",
                product_id,
                demand_quantity: order.demand_quantity,
                total_quantity: order.total_quantity,
            };

            axios
                .post("/apis/v1/order/" + order.order_id, data)
                .then((res) => {
                    setModalOpen(true);
                    setModalContents("거래가 완료되었습니다");
                })
                .catch((e) => {
                    setModalOpen(true);
                    setModalContents("Error: 관리자에게 문의하세요");
                });
        } else if (e.target.name === "예약 중") {
            let data = { sales_stage: "SR" };
            axios
                .post("/apis/v1/order/" + order.order_id, data)
                .then((res) => {
                    setModalOpen(true);
                    setModalContents("거래가 예약되었습니다");
                })
                .catch((e) => {
                    setModalOpen(true);
                    setModalContents("Error: 관리자에게 문의하세요");
                });
        } else {
            axios
                .delete("/apis/v1/order/" + order.order_id)
                .then((res) => {
                    setModalOpen(true);
                    setModalContents("주문이 취소되었습니다.");
                })
                .catch((e) => {
                    setModalOpen(true);
                    setModalContents("Error: 관리자에게 문의하세요");
                });
        }
        setBtnValue(e.target.name);
    };

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <Container>
                <CategoryDirection
                    tag1={"내 상품 목록"}
                    tag2={product.name}
                ></CategoryDirection>

                <Accordion style={{ marginTop: 100 }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <p style={{ fontSize: "1.7rem", margin: 15 }}>
                                내 상품 확인하기
                            </p>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row className="justify-content-md-center">
                                    <Col>
                                        <ListGroup>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                카테고리: {product.category}
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                상품명: {product.name}
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                가격: {setMoney(product.price)}{" "}
                                                원
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                수량: {product.quantity}
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                설명: {product.description}
                                            </ListGroup.Item>
                                            <ListGroup.Item
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                등록일:{" "}
                                                {setDate(product.created_at)}
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                {images}
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <br />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

                <ListGroup style={{ marginTop: 20 }}>
                    {orders.length == 0 ? (
                        <div>
                            <br />
                            <p style={{ fontSize: "1.7rem" }}>
                                아직 주문한 사람이 없네요...
                            </p>
                            <img
                                style={{ maxWidth: "50%", height: "auto" }}
                                src={EmptyBox}
                            ></img>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p
                                className="primaryColor"
                                style={{ fontSize: "1.8rem", margin: 20 }}
                            >
                                주문 요청이 들어왔어요!
                            </p>
                            {orders}
                        </div>
                    )}
                </ListGroup>
            </Container>
        </div>
    );
}

export default MySalesDetail;
