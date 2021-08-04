import React, {useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Container, Button, Row, Col} from 'react-bootstrap'
import Banner from './Banner'
import Title from './Title'
import { CategoryDirection } from './CategoryBanner'


function Register({history}){
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        phone_number: ""
    })
    const {username, password, email, phone_number} = userData;

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })

    };
    const onClickHandler = (e)=>{
        e.preventDefault();
        let body = {
            username: username,
            password: password,
            email: email,
            phone_number:phone_number
        };
        axios.post('/apis/v1/user/', body)
        .then(response => {
            
            alert("축하합니다. 회원이 되셨어요!")
            history.replace('/login')
        }).catch(e =>{
            alert("회원가입 실패")
            console.log("회원가입 실패")
        })

        setUserData({
            username: "",
            password: "",
            email: "",
            phone_number: ""
        })
    }
    return (
        <div>
        
        <Container>
        <CategoryDirection tag1={'회원가입'}></CategoryDirection>
        <br/>
        
            <Row className="justify-content-md-center"> 
                <Col xs lg={12}>
                <Form onSubmit={onClickHandler} >


            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                name = 'username'
                value = {username}
                onChange={onChangeHandler}
                placeholder="ID를 입력해주세요" />
            </Form.Group>
            <br/>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>EMAIL</Form.Label>
                <Form.Control 
                name = 'email'
                value = {email}
                onChange={onChangeHandler}
                placeholder="email을 입력해주세요" />
            </Form.Group>
            <br/>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control
                name = 'password'
                value = {password} 
                onChange={onChangeHandler}
                placeholder="비밀번호를 입력해주세요" />
            </Form.Group>
            <br/>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>PHONE NUMBER</Form.Label>
                <Form.Control
                name = 'phone_number'
                value = {phone_number} 
                onChange={onChangeHandler}
                placeholder="전화번호를 입력해주세요" />
            </Form.Group>
            <br/>
           
           
            <Button size='lg' type="submit">Register</Button>
            </Form>
                
                </Col>
            </Row>
            
        </Container>
        </div>
   
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