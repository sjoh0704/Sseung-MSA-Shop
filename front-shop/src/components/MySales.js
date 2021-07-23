import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'
import { Link } from 'react-router-dom'



function MySales({history}){
 
    const [products, setProducts] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            await axios.get('/apis/v1/product/user/' + userData.user_id).then(res=> {
                console.log(res.data.payload.payload)
             
                let productlist = res.data.payload.payload.map((product, index) => {
                let path = '/mysales/' + product.pk
                    return (
                            <Link style={{textDecoration:'none', color:'inherit'}} key={index} to={path}>
                           
                             <ListGroup.Item key={index}>
                            <Row style={{margin:20}}>
                            <Col md={4}>
                            <img style={{width:'22rem'}} src={product.base64_image_url?product.base64_image_url:placeholder}></img>
                            </Col>
                            <Col md={8}>
                           <div style={{marginLeft:20}}>
                            
                            <p>
                            상품명: {product.name}
                            </p>
                            <p>
                            수량: {product.quantity}
                            </p>
                            <p>
                            지불 금액: {product.price}
                            </p>
                            <p>
                            주문 날짜: {product.created_at}
                            </p>
                            
                            </div>
                            
                            </Col>
                            </Row>
                            </ListGroup.Item>
                            </Link>
                        
                  );
                })
                setProducts(productlist);  
        
                
            })
            
            
        
    }


    useEffect(()=>{
        fetchOrders()
    },[userData.user_id])
    // console.log(orders.length)
    // if(orders.length == 0)
    // (<div>
    //     <Title title="구매 목록" set_middle={false}></Title>
    //     <Container>
    //     <Row>
    //         <Col>
    //         <h2>상품이 없습니다.</h2>
    //         </Col>
    //     </Row>
    //     </Container>

    // </div>)
    

    return (<div>
        <Title title="내 상품 목록" set_middle={false}></Title>
        <Container>
          
        <ListGroup>
            {products}
        </ListGroup>
        </Container>
        

    </div>)
}

export default MySales;