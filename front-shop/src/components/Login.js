import React, {useState} from 'react'
import {useDispatch } from 'react-redux'
import {loginAction} from '../modules/user'
import axios from 'axios'


function Login(){
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const {username, password} = userData;

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
            password: password
        };
        axios.post('/apis/v1/user/login', body)
        .then(response => {
            // props.history.push('/')
            console.log("로그인 성공")
            dispatch(loginAction(response.data.payload))
            alert("로그인 성공")
        }).catch(e =>{
            alert("로그인 실패")
            console.log("로그인 실패")
        })

        setUserData({
            username: "",
            password: ""
        })
    }
    

    return (<div style ={{
        display : 'flex', justifyContent : 'center', alignItems: 'center',
        width : '100%', height : '100vh'
    }}>
        <form style ={{display : 'flex', flexDirection:'column'}}
            onSubmit={onClickHandler}>
            <label>username</label>
            <input name = "username" value = {username} onChange={onChangeHandler}/>
            <label>Password</label>
            <input name = "password" value = {password} onChange={onChangeHandler}/>
            <br/>
            <button type = 'submit'>
                Login
            </button>
        </form>
    </div>);
}

export default Login;