import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import Banner from "./Banner";
import Title from "./Title";
import { CategoryDirection } from "./CategoryBanner";
import Modal from "./Modal";

function Register({ history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };
    const [modalContents, setModalContents] = useState("");

    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        phone_number: "",
    });
    const { username, password, email, phone_number } = userData;

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
            email: email,
            phone_number: phone_number,
        };

        if (!(username && password && email && phone_number)) {
            setModalOpen(true);
            setModalContents("모든 항목을 입력해 주세요");
            return;
        }

        axios
            .post("/apis/v1/user", body)
            .then((response) => {
                history.replace("/login");
            })
            .catch((e) => {
                setModalOpen(true);
                setModalContents(
                    "회원가입에 실패했습니다. 관리자에게 문의해 주세요."
                );
            });

        setUserData({
            username: "",
            password: "",
            email: "",
            phone_number: "",
        });
    };
    return (
        <Container>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={"회원가입"}></CategoryDirection>
            <br />
            <div style={{ fontSize: "1.3rem" }}>
                <Form onSubmit={onClickHandler}>
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Col
                            sm={{ span: 2, offset: 1 }}
                            lg={{ span: 1, offset: 2 }}
                        >
                            <Form.Label style={{ margin: 5 }}>
                                아이디
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 6, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                name="username"
                                value={username}
                                onChange={onChangeHandler}
                                placeholder="아이디를 입력해주세요"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        style={{ paddingTop: 15 }}
                        as={Row}
                        controlId="exampleForm.ControlInput1"
                    >
                        <Col
                            sm={{ span: 2, offset: 1 }}
                            lg={{ span: 1, offset: 2 }}
                        >
                            <Form.Label style={{ margin: 5 }}>
                                이메일
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 6, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                name="email"
                                value={email}
                                onChange={onChangeHandler}
                                placeholder="이메일을 입력해주세요"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        style={{ paddingTop: 15 }}
                        as={Row}
                        controlId="exampleForm.ControlInput1"
                    >
                        <Col
                            sm={{ span: 2, offset: 1 }}
                            lg={{ span: 1, offset: 2 }}
                        >
                            <Form.Label style={{ margin: 5 }}>
                                패스워드
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 6, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                style={{ fontFamily: "ubuntu" }}
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangeHandler}
                                placeholder="패스워드를 입력해 주세요"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        style={{ paddingTop: 15 }}
                        as={Row}
                        controlId="exampleForm.ControlInput1"
                    >
                        <Col
                            sm={{ span: 2, offset: 1 }}
                            lg={{ span: 1, offset: 2 }}
                        >
                            <Form.Label style={{ margin: 5 }}>
                                전화번호
                            </Form.Label>
                        </Col>
                        <Col
                            lg={{ span: 6, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                        >
                            <Form.Control
                                name="phone_number"
                                value={phone_number}
                                onChange={onChangeHandler}
                                placeholder="대시(-) 없이 입력해 주세요"
                            />
                        </Col>
                    </Form.Group>

                    <Row style={{ marginTop: 30 }}>
                        <Col
                            lg={{ span: 6, offset: 3 }}
                            sm={{ span: 10, offset: 2 }}
                        >
                            <div className="d-grid gap-2">
                                <button
                                    style={{ height: 50 }}
                                    type="submit"
                                    className="emptyButton"
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
    //         <label>ID</label>
    //         <input name = "username" value = {username} onChange={onChangeHandler}/>
    //         <label>Email</label>
    //         <input name = "email" value = {email} onChange={onChangeHandler}/>
    //         <label>Password</label>
    //         <input name = "password" value = {password} onChange={onChangeHandler}/>

    //         <br/>
    //         <button type = 'submit'>
    //             Register
    //         </button>
    //     </form>
    // </div>);
}

export default Register;
