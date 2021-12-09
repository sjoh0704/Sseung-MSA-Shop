import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginAction, logoutAction } from "../modules/user";
import { CategoryDirection } from "./CategoryBanner";

function Profile({ history }) {
    const dispatch = useDispatch();
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    console.log(userData);

    const [user, setUser] = useState({
        username: userData.username,
        email: userData.useremail,
        phone_number: userData.phone_number,
    });
    const { username, email, phone_number } = user;
    const user_id = userData.user_id;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const onClickEditHandler = async (e) => {
        e.preventDefault();
        let body = {
            user_id: user_id,
            username: username,
            useremail: email,
            phone_number: phone_number,
        };
        await axios
            .post(`/apis/v1/user/${user_id}`, body)
            .then((response) => {
                alert("사용자 정보 수정 완료");
                dispatch(loginAction(body));
            })
            .catch((e) => {
                alert("사용자 정보 수정 실패");
            });
    };

    const onClickDeleteHandler = async (e) => {
        e.preventDefault();
        await axios
            .delete(`/apis/v1/user/${user_id}`)
            .then((response) => {
                console.log(response);
                alert("회원 탈퇴 완료");
                dispatch(logoutAction());
                history.replace("/");
            })
            .catch((e) => {
                alert("회원 탈퇴 실패");
            });
    };

    return (
        <div>
            <Container>
                <CategoryDirection tag1={"내정보 관리"}></CategoryDirection>
                <br />
                <div style={{ fontSize: "1.2rem" }}>
                    <Row>
                        <Col
                            lg={{ span: 10, offset: 3 }}
                            sm={{ span: 12, offset: 0 }}
                        >
                            <Form>
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        lg="1"
                                        style={{ padding: 10 }}
                                    >
                                        아이디
                                    </Form.Label>
                                    <Col sm="8" lg="6">
                                        <Form.Control
                                            size="lg"
                                            name="username"
                                            value={username}
                                            onChange={onChangeHandler}
                                            placeholder="ID를 입력해주세요"
                                        />
                                    </Col>
                                </Form.Group>
                                <br />
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        lg="1"
                                        style={{ padding: 10 }}
                                    >
                                        이메일
                                    </Form.Label>
                                    <Col sm="8" lg="6">
                                        <Form.Control
                                            size="lg"
                                            name="email"
                                            value={email}
                                            onChange={onChangeHandler}
                                            placeholder="email을 입력해주세요"
                                        />
                                    </Col>
                                </Form.Group>
                                <br />
                                <Form.Group
                                    as={Row}
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        column
                                        sm="2"
                                        lg="1"
                                        style={{ padding: 10 }}
                                    >
                                        전화번호
                                    </Form.Label>
                                    <Col sm="8" lg="6">
                                        <Form.Control
                                            size="lg"
                                            name="phone_number"
                                            value={phone_number}
                                            onChange={onChangeHandler}
                                            placeholder="대시(-) 없이 입력해주세요"
                                        />
                                    </Col>
                                </Form.Group>
                                <br />

                                <Row>
                                    <Col
                                        lg={{ span: 2, offset: 3 }}
                                        sm={{ span: 3, offset: 4 }}
                                    >
                                        <div className="d-grid gap-2">
                                            <button
                                                className="filledButton"
                                                style={{
                                                    fontSize: "1.3rem",
                                                    height: 40,
                                                }}
                                                onClick={onClickEditHandler}
                                            >
                                                수정
                                            </button>
                                            <span> </span>
                                        </div>
                                    </Col>
                                    <Col
                                        lg={{ span: 2, offset: 0 }}
                                        sm={{ span: 3, offset: 0 }}
                                    >
                                        <div className="d-grid gap-2">
                                            <button
                                                className="emptyButton"
                                                style={{
                                                    fontSize: "1.3rem",
                                                    height: 40,
                                                }}
                                                onClick={onClickDeleteHandler}
                                            >
                                                회원 탈퇴
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Profile;
