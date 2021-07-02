import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container} from 'react-bootstrap'
import Title from './Title'
function OrderList(){

    const [orders, setOrders] = useState([]) 
    const fetchOrders= async ()=>{
        await axios.get('/apis/v1/product').then(res=> {
            let order_list = res.data.payload.map((data, index)=> {
                return (
                    <ListGroup.Item key= {index}>{data.fields.name}</ListGroup.Item>
                )
            })
            setOrders(order_list);
            console.log(orders)
        })
    }

    useEffect(()=>{
        fetchOrders()
   
    },[])

    return (<div>
        <Title title="구매 목록" ></Title>
        <Container>
        <ListGroup>
            {orders}
        </ListGroup>
        </Container>
        

    </div>)
}

export default OrderList