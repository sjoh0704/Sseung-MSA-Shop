import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import EmptyCheck from './EmptyCheck'
import { Link } from 'react-router-dom'
import { CategoryDirection } from './CategoryBanner'




function Likes({history}){
    const [carts, setCarts] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))

        const fetchCarts= async()=>{
            let res = await axios.get('/apis/v1/carts/users/' + userData.user_id);
            let cartList = res.data.payload.payload;
            let res_product = await axios.get('/apis/v1/product/');
    
            let productList = res_product.data.payload.payload;
            cartList = cartList.map((cart, index) => {
                console.log(productList)
                const tmp_product = productList.find((product) => product.pk == cart.productId);
                    if(!tmp_product){
                        return;
                    }
                    let path = `/product/${tmp_product.pk}`
                    return (
                        <div>
                            <Link to={path} style={{textDecoration:'none', color:'inherit'}}>
                        
                            <ListGroup.Item key={index}>
                            <Row style={{margin:20}}>
                            <Col md={4}>
                            <img style={{width:'22rem'}} src={tmp_product.base64_image_url}></img>
                            </Col>
                            <Col md={8}>
                        <div style={{marginLeft:20}}>
                            
                            <p>
                            상품명: {tmp_product.name}
                            </p>
                            <p>
                            수량: {tmp_product.quantity}
                            </p>
                            <p>
                            지불 금액: {tmp_product.price}
                            </p>
                            <p>
                            찜한 날짜: {cart.createdAt}
                            </p>
                            
            
                            <br/>
                            
                            </div>
                            
                            </Col>
                            </Row>
                            </ListGroup.Item>
                            </Link>
                        </div>
                        
                    );
           

            });

            setCarts(cartList);
            
            
        }

    useEffect(()=>{
        fetchCarts();
    },[userData.user_id])


    return (<div>
        
        <Container>
        <CategoryDirection tag1={'찜 목록'}></CategoryDirection>
       
        <EmptyCheck text={"찜한 상품이 없습니다"} items={carts?carts:[]}></EmptyCheck>
        </Container>

    </div>)
}

export default Likes;