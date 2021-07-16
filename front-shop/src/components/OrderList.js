import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'



function OrderList({history}){
    var products = []
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            await axios.get('/apis/v1/order/' + userData.user_id).then(res=> {
                console.log(res.data.payload.payload)
                let orderlist = res.data.payload.payload.map((order, index) => {
                    return (
                            
                             <ListGroup.Item>
                            <Row>
                            <Col xs={6} md={6} lg={4}>
                            <img style={{ height: '15rem', width:'24.7rem'}} src={order.base64_image_url?order.base64_image_url:placeholder}></img>
                            </Col>
                            <Col xs={6} md={6} lg={8}>
                           <div>
                            
                            <p>
                            상품명: {order.name}
                            </p>
                            <p>
                            수량: {order.demand_quantity}
                            </p>
                            <p>
                            지불 금액: {order.price}
                            </p>
                            <p>
                            주문 날짜: {order.created_at}
                            </p>
                            </div>
                            
                            </Col>
                            </Row>
                            </ListGroup.Item>
                       
                        
                  );
                })
                setOrders(orderlist);  
        
                
            })
            
            
        
    }


    useEffect(()=>{
        fetchOrders()
    },[userData.user_id])

    if(orders.length == 0)
    (<div>
        <Title title="구매 목록" set_middle={false}></Title>
        <Container>
        <Row>
            <Col>
            <h2>상품이 없습니다.</h2>
            </Col>
        </Row>
        </Container>

    </div>)
    

    return (<div>
        <Title title="구매 목록" set_middle={false}></Title>
        <Container>
          
        <ListGroup>
            {orders}
        </ListGroup>
        </Container>
        

    </div>)
}

export default OrderList;