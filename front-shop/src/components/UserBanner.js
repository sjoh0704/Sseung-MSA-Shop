import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UserBanner = () => {
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    const userLoginChecked = () => {
        if (!isLoggedIn || userData == null) {
            return (
                <Col lg={{ span: 6, offset: 11 }} sm={{ span: 8, offset: 10 }}>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            로그인
                        </button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            회원가입
                        </button>
                    </Link>
                </Col>
            );
        }

        return (
            <Col lg={{ span: 6, offset: 8 }} sm={{ span: 12, offset: 3 }}>
                <div style={{ fontSize: "1.1rem" }}>
                    <Link
                        to="/product/register"
                        style={{ textDecoration: "none" }}
                    >
                        <button style={{ background: "white", border: "none" }}>
                            판매하기
                        </button>
                    </Link>
                    <Link to="/mysales" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            내 상품
                        </button>
                    </Link>
                    <Link to="/orderlist" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            주문 목록
                        </button>
                    </Link>

                    <Link to="/purchaselist" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            구매 목록
                        </button>
                    </Link>
                    <Link to="/likes" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            찜 목록
                        </button>
                    </Link>

                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            프로필
                        </button>
                    </Link>
                    <Link to="/logout" style={{ textDecoration: "none" }}>
                        <button style={{ background: "white", border: "none" }}>
                            로그아웃
                        </button>
                    </Link>
                </div>
            </Col>
        );
    };

    return (
        <Container>
            <Row style={{ margin: 10, marginTop: 20 }}>
                {userLoginChecked()}
            </Row>
        </Container>
    );
};

export default UserBanner;
