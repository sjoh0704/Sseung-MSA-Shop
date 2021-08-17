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
                        <Row style={{margin:30}}>
                        <Col sm='6' lg='5' xs='12'>
                        <img style={{height: 'auto', maxWidth:'100%', height:'auto'}} src={order.base64_image_url?order.base64_image_url:placeholder}></img>
                        </Col>
                        <Col sm='6' lg={{span:6, offset:1}} xs='12'>
                        <div style={{marginLeft:20, paddingTop:10}}>
                        
                        <p style={{fontSize:'1.5rem',marginLeft:20, fontWeight:'bold'}}>
                        {order.name}
                        </p>
                        <p style={{fontSize:'1.3rem',marginLeft:20}}>
                        구매량: {order.demand_quantity}
                        </p>
                        <p style={{fontSize:'1.3rem',marginLeft:20}}>
                        지불 금액: {setMoney(order.price)} ₩
                        </p>
                        <p style={{fontSize:'1.3rem',marginLeft:20}}>
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