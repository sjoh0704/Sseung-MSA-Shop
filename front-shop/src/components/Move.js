import React from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap'
const Move = () => {
    return (
        <div>
            <br/>
            <hr/>
            <Container>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/product/register">ProductRegister</Link></li>
                <li><Link to="/category/1">ProductByCategory</Link></li>
                <li><Link to="/orderlist">OrderList</Link></li>
                
            </ul>
            </Container>
           
        </div>
    );
};

export default Move;