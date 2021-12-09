import { loginAction } from "../modules/user";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { CategoryDirection } from "./CategoryBanner";
import "../App.css";
import Modal from "./Modal";

function Login({ history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };
    const [modalContents, setModalContents] = useState("");

    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = userData;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const onClickHandler = (e) => {
        e.preventDefault();
        let body = {
            username: username,
            password: password,
        };
        axios
            .post("/apis/v1/user/login", body)
            .then((response) => {
                history.replace("/");
                dispatch(loginAction(response.data.payload));
            })
            .catch((e) => {
                setModalOpen(true);
                setModalContents("아이디와 패스워드를 확인해 주세요");
            });
    };

    return (
        <Container>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={"로그인"}></CategoryDirection>
            <br />
            <div style={{ fontSize: "1.3rem" }}>
                <Form onSubmit={onClickHandler}>
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Col
                            sm={{ span: 2, offset: 2 }}
                            lg={{ span: 1, offset: 3 }}
                        >
                            <Form.Label style={{ margin: 10 }}>
                                아이디
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 4, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                size="lg"
                                name="username"
                                value={username}
                                onChange={onChangeHandler}
                                placeholder="아이디를 입력해주세요"
                            />
                        </Col>
                    </Form.Group>
                    <br />
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Col
                            sm={{ span: 2, offset: 2 }}
                            lg={{ span: 1, offset: 3 }}
                        >
                            <Form.Label style={{ margin: 5 }}>
                                패스워드
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 4, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                style={{ fontFamily: "ubuntu" }}
                                size="lg"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangeHandler}
                                placeholder="패스워드를 입력해주세요"
                            />
                        </Col>
                    </Form.Group>
                    <br />
                    <Row>
                        <Col
                            lg={{ span: 5, offset: 3 }}
                            sm={{ span: 10, offset: 2 }}
                        >
                            <div className="d-grid gap-2">
                                <button
                                    style={{ height: 50 }}
                                    type="submit"
                                    className="filledButton"
                                >
                                    로그인
                                </button>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 15 }}>
                        <Col
                            lg={{ span: 5, offset: 3 }}
                            sm={{ span: 10, offset: 2 }}
                        >
                            <div className="d-grid gap-2">
                                <button
                                    style={{ height: 50 }}
                                    className="emptyButton"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        history.replace("/register");
                                    }}
                                >
                                    회원가입
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );

    // return (<div style ={{
    //     display : 'flex', justifyContent : 'center', alignItems: 'center',
    //     width : '100%', height : '100vh'
    // }}>
    //     <form style ={{display : 'flex', flexDirection:'column'}}
    //         onSubmit={onClickHandler}>
    //         <label>username</label>
    //         <input name = "username" value = {username} onChange={onChangeHandler}/>
    //         <label>Password</label>
    //         <input name = "password" value = {password} onChange={onChangeHandler}/>
    //         <br/>
    //         <button type = 'submit'>
    //             Login
    //         </button>
    //     </form>
    // </div>);
}

export default Login;
