import React, {useEffect} from 'react'
import axios from 'axios';
import {logoutAction} from '../modules/user'
import {useDispatch} from 'react-redux'

function Logout(props) {
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
        <div style ={{
            display : 'flex', justifyContent : 'center', alignItems: 'center',
            width : '100%', height : '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick = {onClickHandler}>로그아웃</button>
        </div>
    )
}

export default Logout;