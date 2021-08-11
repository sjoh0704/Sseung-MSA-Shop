import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'
import EmptyCheck from './EmptyCheck'
import { CategoryDirection } from './CategoryBanner'
import {setMoney, setDate} from './Convenient'


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
                let tmp_orders = res.data.payload.payload.filter(order=> order.sales_stage!='SO')
                let orderlist = tmp_orders.map((order, index) => {
                    return (
                            
                             <ListGroup.Item key={index}>
                            <Row style={{margin:20}}>
                            <Col md={4}>
                            <img style={{width:'22rem'}} src={order.base64_image_url?order.base64_image_url:placeholder}></img>
                            </Col>
                            <Col md={8}>
                           <div style={{margin:20}}>
                            
                            <p style={{fontSize:'1.3rem', fontWeight:'bold'}}>
                            {order.name}
                            </p>
                            <p style={{fontSize:'1.3rem'}}>
                            수량: {order.demand_quantity}
                            </p>
                            <p style={{fontSize:'1.3rem'}}>
                            지불 금액: {setMoney(order.price)} 원
                            </p>
                            <p style={{fontSize:'1.3rem'}}>
                            주문일: {setDate(order.created_at)}
                            </p>
                            <p style={{fontSize:'1.3rem'}}>
                            주문 상태: {order.sales_stage=='S'?
                            <span style={{color:'red',fontWeight:'bold'}}>판매자의 확인을 기다려주세요</span>:<span style={{color:'green', fontWeight:'bold'}}>예약되었습니다! 판매자와 거래하세요</span>}
                            </p>
                            <br/>
                            <Button size='lg' onClick={()=>{
                                connectSeller(order.seller_id)
                            }}>판매자에게 연락하기</Button>
            
                            <br/>
                            
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
    

    const connectSeller = async(seller_id) => {
        let res = await axios.get(`/apis/v1/user/${seller_id}`)
        let tmp = res.data.payload.payload.phone_number
        let phone_number = tmp.slice(0,3) + '-'+tmp.slice(3,7) + '-'+tmp.slice(7,11) 
        alert(`[${phone_number}]로 연락해주세요!`)
    }
    
    const result = () => {
        if(orders.length == 0){
            return(<Row>
                <Col>
                    <h2>주문한 상품이 없습니다.</h2>
                </Col>
            </Row>);
        }
        else{
            return (
                <ListGroup>
                {orders}
                </ListGroup>
            );

        }
    }


    return (<div>
         <Container>
         <CategoryDirection tag1={'주문 목록'}></CategoryDirection>
       
          
        <EmptyCheck text={"주문한 상품이 없습니다"} items={orders}></EmptyCheck>
        </Container>
        

    </div>)
}

export default OrderList;