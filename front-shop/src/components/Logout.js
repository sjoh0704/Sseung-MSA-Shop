import React, {useEffect} from 'react'
import axios from 'axios';
import {logoutAction} from '../modules/user'
import {useDispatch} from 'react-redux'
import {Container, Col, Row} from 'react-bootstrap'
import { CategoryDirection } from './CategoryBanner';
function Logout({history}) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        axios.get('/apis/v1/user/logout')
        .then(res => {
            dispatch(logoutAction())
            alert('로그아웃 합니다.')
            history.replace('/')
        })
        .catch(e => {
            alert('로그아웃에 실패했습니다. 관리자에게 문의해 주세요.')
        })
    }
    return (
        <div >
            <Container>
         
            <CategoryDirection tag1={'로그아웃'}></CategoryDirection>
            <br/>
            <Row> 
                    <Col lg={{span: 4, offset:4}}
                    sm={{span: 6, offset:3}}
                    >
                    <h3>정말 로그아웃 하시겠습니까?</h3>
                    <br/>
                    <br/>
                    <div className="d-grid gap-2">
                    <button 
                    className="emptyButton" 
                    style={{
                        fontSize: '1.3rem',
                        height:45
                    }}
                    onClick = {onClickHandler}>로그아웃</button>
                    <br/>
                    </div>
                    
                    </Col>
                </Row>
            
            </Container>
          
        </div>
    )
}

export default Logout;