import {Container, Row, Col} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import React from 'react'
import Logout from './Logout'
import { Link } from 'react-router-dom';

const Top = ()=>{
    const {isLoggedIn, userData} = useSelector(state =>({
            isLoggedIn: state.user.isLoggedIn,
            userData: state.user.payload
    }))


    if(!isLoggedIn || userData == null){
        return(
            <Container>
                <br/>
                <Row>
                <Col md={{ span: 5, offset: 9 }}>
                <div>
                <span><Link to='/login' style={{textDecoration:'none'}}>로그인 / </Link></span>
                <span><Link to='/register' style={{textDecoration:'none'}}>회원가입</Link></span>
                </div>
                </Col>
                
                </Row>
            </Container>
            
        
        )
    }
    else{
        console.log(userData)
        return(
            <Container>
            <br/> 
            <Row>
            <Col md={{ span: 5, offset: 7 }}>
            <div>
            <span >오늘도 오셨군요! {userData.username}님! / </span>
            <span><Link to='/logout' style={{textDecoration:'none'}}>로그아웃</Link></span>
            </div>
            </Col>
            
            </Row>
            </Container>

            
        )
    }
}


export default Top;