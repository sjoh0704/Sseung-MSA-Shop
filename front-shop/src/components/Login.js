import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setUserAction, loginAction} from '../modules/user'
function Login(){
    const [userData, setUserData] = useState({
        username: null,
        password: null
    })
    const {username, password} = userData;
    const dispatch = useDispatch();
    const loginUser = (userData) => dispatch(loginAction(userData));
    const setUser = (userData) => dispatch(setUserAction(userData));

    const onChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        setUser(userData);
        console.log(userData);
    };
    const onReset = () => {
        setUserData({
            username: "",
            password: ""
        })
    }
    // const {userData} = useSelector(state => ({
    //     userData: state.user.userData
    // }))




    return (<div>
        <p>아이디</p>
        <input name='username' value={username} onChange={onChange} placeholder="아이디를 입력해주세요"></input>
        <p>비밀번호</p>
        <input name='password' value={password} onChange={onChange} placeholder="비밀번호를 입력해주세요"></input>
        <br/>
        <button onClick={()=> {
            loginUser(userData);
            onReset()
        }}>로그인</button>
    </div>);
}

export default Login;