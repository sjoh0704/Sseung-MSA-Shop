import React, {useEffect, useState} from 'react'
function Login({loginAction}){
    const [userData, setUserData] = useState({
        username: null,
        password: null
    })
    const {username, password} = userData;

    const onChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        console.log(userData);
    };
    

    return (<div>
        <p>아이디</p>
        <input name='username' value={username} onChange={onChange} placeholder="아이디를 입력해주세요"></input>
        <p>비밀번호</p>
        <input name='password' value={password} onChange={onChange}placeholder="비밀번호를 입력해주세요"></input>
        <br/>
        <button onClick={loginAction}>로그인</button>
    </div>);
}

export default Login;