import React from 'react';
import { Link } from 'react-router-dom';

const Move = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/product/register">ProductRegister</Link></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Move;