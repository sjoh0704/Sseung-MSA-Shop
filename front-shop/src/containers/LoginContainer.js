import React from 'react'
import Login from '../components/Login'
import {loginUser} from '../modules/user'
import { useSelector, useDispatch } from 'react-redux'

//export default는 중괄호 없이 가져올 수 있다. 
//export만 있으면 {}를 이용

function LoginContainer(){
    
    const {userData} = useSelector(state => ({
        userData: state.user.userData
    }))

    const dispatch = useDispatch();

    const loginUser = (userData) => dispatch(loginUser(userData));
    const setUser = (userData) => dispatch(loginUser(userData));

    return (
        <Login data={userData} setUser={setUser}loginUser={loginUser}></Login>
    )
}

export default LoginContainer