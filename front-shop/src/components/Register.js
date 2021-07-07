import React, {useState} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Container, Button, Row, Col} from 'react-bootstrap'
import Banner from './Banner'
import Title from './Title'


function Register(){
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const {username, password, email} = userData;

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
            email: email
        };
        axios.post('/apis/v1/user/', body)
        .then(response => {
            // props.history.push('/')
            console.log("회원가입 성공")
            // dispatch(loginAction(response.data.payload))
            alert("회원가입 성공")
        }).catch(e =>{
            alert("회원가입 실패")
            console.log("회원가입 실패")
        })

        setUserData({
            username: "",
            password: "",
            email: ""
        })
    }
    return (
        <div>
        
        <Title title="REGISTER"/>
        <Container>
            <Row className="justify-content-md-center"> 
                <Col xs lg={8}>
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
           
            <Button type="submit">Register</Button>
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