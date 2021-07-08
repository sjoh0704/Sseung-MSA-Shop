import React, {useEffect} from 'react'
import axios from 'axios';
import {logoutAction} from '../modules/user'
import {useDispatch} from 'react-redux'
import {Container, Button, Col, Row} from 'react-bootstrap'
import Title from './Title'
function Logout({history}) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        axios.get('/apis/v1/user/logout')
        .then(response => {
            console.log('로그아웃 합니다.')
            dispatch(logoutAction())
            alert('로그아웃 합니다.')
            history.replace('/')
        })
        .catch(e => {
            console.log('로그아웃 실패 에러')
            alert('로그아웃 실패')
        })
    }
    return (
        <div >
            <Container>
            <Title title="LOGOUT"></Title>
            <Row className="justify-content-md-center"> 
                    <Col xs lg="8">
                    <h3>정말 로그아웃 하시겠습니까?</h3>
                    <br/>
                    <br/>
                    
                    <Button onClick = {onClickHandler}>로그아웃</Button>
                    <br/>
                    
                    </Col>
                </Row>
            
            </Container>
          
        </div>
    )
}

export default Logout;