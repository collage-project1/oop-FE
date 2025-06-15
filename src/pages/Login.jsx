import React, { useState } from "react";
import axios from "axios";
import { LOGIN_FAIL } from "../constants/ErrorMessage.js";
import '../style/Login.css'
import { LOGIN_API_URL } from "../constants/ApiConstants.js";
import { useNavigate } from "react-router-dom";
import { SINCHEONG_URL } from "../constants/URLConstants.js";

const Login = () => {
    const [credentials, setCredentials ] = useState({ userId: '', userPassword: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value});
    };

    const navigate =useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_API_URL, credentials);
            localStorage.setItem('token', response.data.data.accessToken); // 캐시에 토큰 저장
            navigate(SINCHEONG_URL);
        }catch(error){
            alert(LOGIN_FAIL);
        }
    }
    return(
        <div className="login-container">
            <h1 className="login-title">로그인</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userId"
                    placeholder="아이디"
                    className="login-input"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="userPassword"
                    placeholder="비밀번호"
                    className="login-input"
                    onChange={handleChange}
                />
                <button type="submit" className="login-button">로그인</button>
            </form>
        </div>
    )
}

export default Login;