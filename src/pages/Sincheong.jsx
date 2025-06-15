import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseRegistration from '../components/CourseRegistration';
import "../style/Sincheong.css"
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../constants/URLConstants';
import { USERNAME_API_URL } from '../constants/ApiConstants';

const Sincheong = ()=>{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleLogout = () => {
        const confirmLogout = window.confirm('로그아웃 하시겠습니까?');

        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate(LOGIN_URL);
        }
    }

    const fetchUsername = async () => {
        try {
            const response = await axios.get(`${USERNAME_API_URL}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsername(response.data.data);
        } catch (error) {
            //
        }
    };

    useEffect(() => {
        fetchUsername();
    }, []);

    return(
        <div>
            <div className='header-panel'>
                <h1>수강신청</h1>
                <h2 className='username'>환영합니다 {username}님!</h2>
                <button className='logout-button' onClick={handleLogout}>로그아웃</button>
            </div>
            <CourseRegistration/>
        </div>
    )
}

export default Sincheong;