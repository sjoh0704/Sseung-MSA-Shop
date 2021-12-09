import {
    ListGroup,
    Container,
    Button,
    Form,
    Row,
    Col,
    ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyHeartImg from "../assets/images/heart.png";
import HeartImg from "../assets/images/heart_pressed.png";
import { CategoryDirection } from "./CategoryBanner";
import { setMoney, setDate } from "./Convenient";
import Rating from "./Rating";
import Modal from "./Modal";

function ProductDetail({ match, history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    const [amount, setAmount] = useState(1);
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));
    const [like, setLike] = useState({ checked: false });
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});

    const fetchProduct = async () => {
        let res = await axios.get("/apis/v1/product/" + match.params.number);
        let tmp = res.data.payload;
        setProduct({
            ...res.data.payload,
            product_id: match.params.number,
        });
        setImages(tmp.image);

        let res_seller = await axios.get("/apis/v1/user/" + tmp.seller_id);
        setSeller(res_seller.data.payload);

        // check likes

        if (isLoggedIn) {
            let body = {
                seller_id: res.data.payload.seller_id,
                buyer_id: userData.user_id,
                product_id: parseInt(match.params.number),
            };
            let res_likes = await axios.post("/apis/v1/carts/check", body);
            setLike(res_likes.data.payload);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [match.params.number, like.checked]);

    const onClickOrder = (e) => {
        if (isLoggedIn === false || userData == null) {
            setModalOpen(true);
            setModalContents("로그인 후 이용하세요.");
            history.replace("/login");
        } else if (userData.user_id == product.seller_id) {
            setModalOpen(true);
            setModalContents("판매자가 구매할 수 없습니다.");
            e.preventDefault();
        } else if (amount < 1 || amount > product.quantity) {
            setModalOpen(true);
            setModalContents("수량이 올바르지 않습니다.");
            e.preventDefault();
        }
    };

    const onClickCart = async () => {
        if (isLoggedIn === false) {
            setModalOpen(true);
            setModalContents("로그인 후 이용하세요.");
            return;
        }

        if (like.checked) {
            await axios.delete(`/apis/v1/carts/${like[0]._id}`);
            setLike({ checked: false });
        } else {
            let body = {
                seller_id: product.seller_id,
                buyer_id: userData.user_id,
                product_id: parseInt(product.product_id),
            };
            await axios.post("/apis/v1/carts/", body);
            setLike({ checked: true });
        }
    };

    const onChangeHandler = (e) => {
        const { value } = e.target;
        setAmount(parseInt(value));
    };

    const displayImages = () => {
        if (images.length == 1) {
            return;
        }
        return images.slice(1).map((img) => (
            <ListGroupItem>
                <br />
                <img
                    style={{
                        width: "60vw",
                    }}
                    src={img}
                ></img>
                <br />
                <br />
            </ListGroupItem>
        ));
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
                />
                <Row>
                    <Col xs="12" sm="12" lg="7">
                        <img
                            style={{
                                width: "90%",
                                height: "auto",
                            }}
                            src={images[0]}
                        ></img>
                    </Col>
                    <Col xs="12" sm="10" lg="5">
                        <Row style={{ paddingTop: 5 }}>
                            <Rating user={seller} area={product.area} />
                        </Row>
                        <hr />

                        <Row style={{ marginTop: 20, paddingTop: 20 }}>
                            <Col xs="9" sm="9">
                                <p
                                    style={{
                                        marginLeft: 20,
                                        fontSize: "2.2rem",
                                        fontWeight: "bolder",
                                    }}
                                >
                                    {product.name}
                                </p>
                            </Col>
                            <Col xs="3" sm="3">
                                <img
                                    style={{ width: "2rem" }}
                                    src={
                                        like.checked ? HeartImg : EmptyHeartImg
                                    }
                                    onClick={onClickCart}
                                ></img>
                            </Col>
                        </Row>

                        <p style={{ fontSize: "2rem", margin: 20 }}>
                            {setMoney(product.price)} ₩
                        </p>
                        <p style={{ fontSize: "1.5rem", margin: 20 }}>
                            남은 수량: {product.quantity}
                        </p>
                        <Row style={{ fontSize: "1.5rem", padding: 20 }}>
                            <Col xs="6" sm="12" lg={4}>
                                <p>선택 수량:</p>
                            </Col>

                            <Col xs="6" sm="9" lg={4}>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            style={{ fontSize: "1.5rem" }}
                                            type="number"
                                            onChange={onChangeHandler}
                                            value={amount}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Col>
                            <p style={{ fontSize: "3em", margin: 20 }}>
                                {product.price
                                    ? (product.price * amount)
                                          .toString()
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : product.price * amount}{" "}
                                ₩
                            </p>
                        </Col>

                        <Col xs="12">
                            <Link
                                to={
                                    isLoggedIn
                                        ? {
                                              pathname: `/purchase`,
                                              state: {
                                                  product: product,
                                                  demand_amount: amount,
                                              },
                                          }
                                        : "/product/" + match.params.number
                                }
                                style={{ textDecoration: "none" }}
                            >
                                <div className="d-grid gap-2">
                                    <button
                                        className="emptyButton"
                                        onClick={onClickOrder}
                                        style={{
                                            fontSize: "1.3rem",
                                            margin: 20,
                                            height: 50,
                                        }}
                                    >
                                        구매하기
                                    </button>
                                </div>
                            </Link>
                        </Col>
                    </Col>
                </Row>

                <Row style={{ marginTop: 80 }}>
                    <Col>
                        <ListGroup>
                            <ListGroupItem>
                                <p style={{ margin: 10, fontSize: "2rem" }}>
                                    상품 상세{" "}
                                </p>
                            </ListGroupItem>

                            {displayImages()}

                            <ListGroupItem>
                                <p style={{ margin: 20, fontSize: "2rem" }}>
                                    {product.description}
                                </p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetail;
