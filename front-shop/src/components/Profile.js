import React, {useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import Title from './Title'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { logoutAction } from '../modules/user'

function Profile({history}){
    const dispatch = useDispatch()
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))

    if(isLoggedIn==false || userData==null){
        alert('로그인 먼저 해주세요!');
        history.replace('/')
    }
    
    console.log(userData)
    
    const [user, setUser] = useState({
        username: userData.username,
        email: userData.useremail
    })
    const {username, email} = user
    const user_id = userData.user_id

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })

    };
    const onClickEditHandler = async(e)=>{
        e.preventDefault();
        let body = {
            username: username,
            email: email
        };
        await axios.post(`/apis/v1/user/${user_id}`, body)
        .then(response => {
            alert("사용자 정보 수정 완료")
        }).catch(e =>{
            alert("사용자 정보 수정 실패")
        })
    }

    const onClickDeleteHandler = async(e)=>{
        e.preventDefault();
        await axios.delete(`/apis/v1/user/${user_id}`)
        .then(response => {
            console.log(response)
            alert("회원 탈퇴 완료")
            dispatch(logoutAction())
            history.replace('/')
        }).catch(e =>{
            alert("회원 탈퇴 실패")
        })
    }


    
    


    return(
        <div>
        
        <Title title="PROFILE"/>
        <Container>
            <Row className="justify-content-md-center"> 
                <Col xs lg={10}>
                <Form>


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
            
            <Button onClick={onClickEditHandler}>수정</Button><span>{' '}</span>
            <Button onClick={onClickDeleteHandler}>회원 탈퇴</Button>
            </Form>
                
                </Col>
            </Row>
            
        </Container>
        </div>
    );

}

export default Profile