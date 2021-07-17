import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'



function MySalesDetail({history, match}){
    var products = []
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            await axios.get('/apis/v1/order/sale/' + match.params.number).then(res=> {
                console.log(res.data.payload.payload)
                let tmp_orders = res.data.payload.payload.filter(order=> order.sales_stage!='SO')
                let orderlist = tmp_orders.map((order, index) => {
                    return (
                            
                             <ListGroup.Item key={index}>
                            <Row style={{margin:20}}>
                            <Col md={4}>
                            <img style={{ height: '12vw', width:'18vw'}} src={order.base64_image_url?order.base64_image_url:placeholder}></img>
                            </Col>
                            <Col md={8}>
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
                            <p>
                            주문 상태: {order.sales_stage=='S'?
                            <span style={{color:'red'}}>판매자의 확인을 기다려주세요</span>:<span style={{color:'green'}}>예약 중인 상품입니다.</span>}
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
        <Title title="주문 목록" set_middle={false}></Title>
        <Container>
          
        <ListGroup>
            {orders}
        </ListGroup>
        </Container>
        

    </div>)
}

export default MySalesDetail;