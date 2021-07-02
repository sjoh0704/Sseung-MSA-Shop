import React, {useEffect} from 'react'
import axios from 'axios';
import {logoutAction} from '../modules/user'
import {useDispatch} from 'react-redux'
import {Container, Button} from 'react-bootstrap'
import Title from './Title'
function Logout() {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        axios.get('/apis/v1/user/logout')
        .then(response => {
            console.log('로그아웃 합니다.')
            dispatch(logoutAction())
        })
        .catch(e => {
            console.log('로그아웃 실패 에러')
        })
    }
    return (
        <div >
            <Container>
            <Title title="LOGOUT"></Title>
            <h3>정말 로그아웃 하시겠습니까?</h3>
            <br/>
            <Button onClick = {onClickHandler}>로그아웃</Button>
            </Container>
          
        </div>
    )
}

export default Logout;