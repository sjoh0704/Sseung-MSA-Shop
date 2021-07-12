import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import Loading from './Loading'

function OrderList({history}){
    var products = []
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            await axios.get('/apis/v1/order/' + userData.user_id).then(res=> {
            let order_list = res.data.payload.map((data, index)=> {
            let product = products.find(pro => pro.product_id == data.fields.product_id)
                return ({
                ...product,
                ...data.fields
            })
            })
            
            let displayOrder = order_list.map((order, index) => {
                return (
                
                    <ListGroup.Item><div>
                        <p>
                        상품명: {order.name}
                        </p>
                        <p>
                        수량: {order.quantity}
                        </p>
                        <p>
                        지불 금액: {order.price}
                        </p>
                        <p>
                        주문 날짜: {order.created_at}
                        </p>
                        </div></ListGroup.Item>
              );
            })
            
            setOrders(displayOrder);
        })
    }



    const fetchProducts= async()=>{
         await axios.get('/apis/v1/product').then(res=> {
    
            console.log(res.data.payload)
            let tmp = res.data.payload.payload.map(data=> {
                return  {
                    ...data.fields,
                    product_id: data.pk
                }
            })
            console.log(tmp)
            products = tmp
            fetchOrders()
        })
    }


    useEffect(()=>{
        fetchProducts()
       
   
    },[userData.user_id])


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