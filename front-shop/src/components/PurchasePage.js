import { ListGroup, Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CategoryDirection } from "./CategoryBanner";
import { setMoney, setDate } from "./Convenient";
import Modal from "./Modal";

function PurchasePage({ location, history }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    const { product, demand_amount } = location.state;
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));
    console.log(product);
    console.log(demand_amount);

    const [purchaseData, setPurchaseData] = useState({
        address: null,
        email_address: null,
    });
    const { address, email_address } = purchaseData;

    const orderProduct = async () => {
        if (!(address && email_address)) {
            setModalOpen(true);
            setModalContents("모든 항목을 입력해 주세요");
            return;
        }
        let body = {
            ...product,
            product_id: product.product_id,
            seller_id: product.seller_id,
            buyer_id: userData.user_id,
            demand_amount: demand_amount,
            address: address,
            quantity: product.quantity,
            email_address: email_address,
        };
        console.log(body);
        await axios
            .post("/apis/v1/order", body)
            .then((res) => {
                history.replace("/orderlist");
            })
            .catch((e) => {
                // 정보가 없을 때 처리
                alert("주문에 실패하였습니다. 관리자에게 문의해 주세요");
            });
    };

    const onClickOrder = () => {
        if (isLoggedIn === false) {
            alert("로그인 후 이용하세요.");
            return;
        }
        orderProduct();
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value,
        });
    };

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <Container>
                <CategoryDirection
                    tag1={product.category}
                    tag2={product.name}
                    tag3={"구매하기"}
                ></CategoryDirection>
                <br />
                <p
                    style={{
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        margin: 15,
                    }}
                >
                    상품 정보를 확인하세요
                </p>
                <hr />
                <Row>
                    <Form style={{ fontSize: "1.3rem" }}>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label style={{ padding: 5 }}>
                                    카테고리
                                </Form.Label>
                            </Col>

                            <Col lg="4" sm="6" xs="6">
                                <Form.Control
                                    style={{ fontSize: "1.3rem" }}
                                    plaintext
                                    readOnly
                                    defaultValue={product.category}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label style={{ padding: 5 }}>
                                    상품명
                                </Form.Label>
                            </Col>

                            <Col lg="4" sm="6" xs="6">
                                <Form.Control
                                    style={{ fontSize: "1.3rem" }}
                                    plaintext
                                    readOnly
                                    defaultValue={product.name}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label style={{ padding: 5 }}>
                                    상품 가격
                                </Form.Label>
                            </Col>

                            <Col lg="4" sm="6" xs="6">
                                <Form.Control
                                    style={{ fontSize: "1.3rem" }}
                                    plaintext
                                    readOnly
                                    defaultValue={setMoney(product.price)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label style={{ padding: 5 }}>
                                    상품 수량
                                </Form.Label>
                            </Col>

                            <Col lg="4" sm="6" xs="6">
                                <Form.Control
                                    style={{ fontSize: "1.3rem" }}
                                    plaintext
                                    readOnly
                                    defaultValue={product.quantity}
                                />
                            </Col>
                        </Form.Group>
                    </Form>

                    <p
                        style={{
                            fontSize: "1.6rem",
                            fontWeight: "bold",
                            marginTop: 50,
                            margin: 15,
                        }}
                    >
                        구매 정보를 입력하세요
                    </p>
                    <hr />

                    <Form>
                        <Form.Group
                            as={Row}
                            controlId="exampleForm.ControlInput1"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label
                                    style={{ fontSize: "1.3rem", margin: 10 }}
                                >
                                    구매 수량
                                </Form.Label>
                            </Col>

                            <Col lg="2" sm="2" xs="4">
                                <Form.Control
                                    name="demand_amount"
                                    value={demand_amount}
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            controlId="exampleForm.ControlInput1"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label
                                    style={{ fontSize: "1.3rem", margin: 10 }}
                                >
                                    이메일 주소
                                </Form.Label>
                            </Col>

                            <Col lg="6" sm="6" xs="6">
                                <Form.Control
                                    name="email_address"
                                    value={email_address}
                                    onChange={onChangeHandler}
                                    placeholder="거래 정보를 받을 이메일을 적어주세요"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            controlId="exampleForm.ControlInput1"
                        >
                            <Col
                                lg={{ span: 4, offset: 1 }}
                                sm={{ span: 4, offset: 1 }}
                                xs={{ span: 5, offset: 1 }}
                            >
                                <Form.Label
                                    style={{ fontSize: "1.3rem", margin: 10 }}
                                >
                                    거래 장소
                                </Form.Label>
                            </Col>
                            <Col lg="6" sm="6" xs="6">
                                <Form.Control
                                    name="address"
                                    value={address}
                                    onChange={onChangeHandler}
                                    placeholder="거래 선호 지역을 적어주세요"
                                />
                            </Col>
                        </Form.Group>

                        <br />
                    </Form>
                    <Col
                        lg={{ span: 6, offset: 5 }}
                        sm={{ span: 6, offset: 5 }}
                        xs={{ span: 12 }}
                    >
                        <h1>총 가격: {product.price * demand_amount}원</h1>
                        <div className="d-grid gap-2">
                            <br />
                            <button
                                style={{ fontSize: "1.4rem" }}
                                className="emptyButton"
                                onClick={onClickOrder}
                            >
                                구매하기
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PurchasePage;
