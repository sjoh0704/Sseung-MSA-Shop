import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'
import EmptyCheck from './EmptyCheck'
import { CategoryDirection } from './CategoryBanner'
import {setMoney, setDate} from './Convenient'


function PurchaseList({history}){
    var products = []
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            let res = await axios.get('/apis/v1/order/' + userData.user_id)
            let tmp_order = res.data.payload.payload.filter(order=> order.sales_stage == 'SO')
            let orderlist = tmp_order.map((order, index) => {
                return (
                        
                            <ListGroup.Item key={index}>
                        <Row style={{margin:20}}>
                        <Col md={4}>
                        <img style={{width:'22rem'}} src={order.base64_image_url?order.base64_image_url:placeholder}></img>
                        </Col>
                        <Col md={8}>
                        <div>
                        
                        <p style={{fontSize:'1.5rem',margin:15, fontWeight:'bold'}}>
                        {order.name}
                        </p>
                        <p style={{fontSize:'1.3rem',margin:15}}>
                        구매량: {order.demand_quantity}
                        </p>
                        <p style={{fontSize:'1.3rem',margin:15}}>
                        지불 금액: {setMoney(order.price)} 원
                        </p>
                        <p style={{fontSize:'1.3rem',margin:15}}>
                        주문 날짜: {setDate(order.created_at)}
                        </p>
                        </div>
                        
                        </Col>
                        </Row>
                        </ListGroup.Item>
                    
                    
                );
            })
            setOrders(orderlist);  
        
                
           
            
            
        
    }


    useEffect(()=>{
        fetchOrders()
    },[userData.user_id])



 

    
    

    return (<div>
   
        <Container>
        <CategoryDirection tag1={'구매 목록'}></CategoryDirection>
        <EmptyCheck text={"구매한 상품이 없습니다"} items={orders}></EmptyCheck>
        </Container>
        

    </div>)
}

export default PurchaseList;