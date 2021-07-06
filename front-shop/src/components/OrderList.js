import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
function OrderList(){
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))

    const [orders, setOrders] = useState([]) 
    const fetchOrders= async ()=>{
        await axios.get('/apis/v1/order/' + userData.user_id).then(res=> {
            let order_list = res.data.payload.map((data, index)=> {
                return (
                    data.fields
                )
            })
            setOrders(order_list);
            console.log(orders)
        })
    }

    useEffect(()=>{
        fetchOrders()
   
    },[userData.user_id])

    return (<div>
        <Title title="구매 목록" set_middle={false}></Title>
        <Container>
        <ListGroup>
            {/* {orders} */}
        </ListGroup>
        </Container>
        

    </div>)
}

export default OrderList