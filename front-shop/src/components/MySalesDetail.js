import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'



function MySalesDetail({history, match}){
    const [btnValue, setBtnValue] = useState('')
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))
    const[images,setImages]= useState([])
    const[product,setProduct]= useState({})
    const fetchProduct= async ()=>{
        let res = await axios.get('/apis/v1/product/' + match.params.number)
           
            setProduct({
            ...res.data.payload.payload,
            product_id: match.params.number
            });
            let image_list = await res.data.payload.payload.image.map(img => (<div >
                <br/>
                <img style = {{  
                    width: "60rem"
                    }} src={img}></img>
                <br/>
                <br/>
                
            </div>));
        setImages(image_list);


    }
    
    



    const fetchOrders= async()=>{
        let res = await axios.get('/apis/v1/order/sale/' + match.params.number)
        console.log(res)
        let tmp_orders = res.data.payload.payload.filter(order=> order.sales_stage!='SO')
        console.log(tmp_orders)
        let orderlist = tmp_orders.map((order, index) => {
        let sale_status = ''
            if(order.sales_stage == 'S')
                sale_status='판매 중'
            else if(order.sales_stage == 'SR')
                sale_status='예약 중'
            else
                sale_status='판매 완료'

            return (
                    
                        <ListGroup.Item key={index}>
                    <Row style={{margin:20}}>
                    <Col>
                    <div>
                    <p>
                    구매자: {order.user_name}
                    </p>
                    <p>
                    구매자 이메일: {order.user_email}
                    </p>
                    <p>
                    구매자 연락처: {order.phone_number}
                    </p>
                    <p>
                    구매량: {order.demand_quantity}
                    </p>
                    <p>
                    지불 금액: {order.price}
                    </p>
                    <p>
                    주문 날짜: {order.created_at}
                    </p>
                    <DropdownButton id="dropdown-basic-button" title={btnValue?btnValue:sale_status}>
                    <Dropdown.Item onClick={(e) => {onClickHandler(order.order_id, e)}} name='판매 중'>판매 중</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {onClickHandler(order.order_id, e)}} name='예약 중'>예약 중</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {onClickHandler(order.order_id, e)}} name='판매 완료'>판매 완료</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {onClickHandler(order.order_id, e)}} name='거래 취소'>거래 취소</Dropdown.Item>
                    </DropdownButton>
                    
                    </div>
                    
                    </Col>
                    </Row>
                    </ListGroup.Item>
                    
                        
                  );
                })
                setOrders(orderlist);  
        
                
            
            
            
        
    }


    useEffect(()=>{
        fetchProduct()
        fetchOrders()
    },[userData.user_id, btnValue])
    

    const onClickHandler = (order_id, e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
     
        if(e.target.name  === '판매 완료'){
            
            alert('거래가 완료되셨습니까?')
            let data = {sales_stage: "SO"}
            axios.post('/apis/v1/order/' + order_id, data).then(res=> {
                alert('거래가 성사되었습니다.')
                
            })
            .catch(e=>{
                alert('잘못되었습니다.')
            })
      
        }
        else if(e.target.name  === '예약 중'){
            alert('거래를 예약하시겠습니까?')
            let data = {sales_stage: "SR"}
            axios.post('/apis/v1/order/' + order_id, data).then(res=> {
                console.log(res)
                alert('성공')
            })
            .catch(e=>{
                alert('실패')
            })
        }
        else{
            alert('주문 요청을 취소하시겠습니까?')
 
            axios.delete('/apis/v1/order/' + order_id).then(res=> {
                
                alert('주문이 취소되었습니다.')
            })
            .catch(e=>{
                alert('Error')
            })

        }      
        setBtnValue(e.target.name)
    }
  
    

    return (<div>
        <Title title="주문 목록" set_middle={false}></Title>
        <Container>
        <Row className="justify-content-md-center">
                <Col>
                <ListGroup>
            <ListGroup.Item>상품 카테고리: {product.category}</ListGroup.Item>
            <ListGroup.Item>상품명: {product.name}</ListGroup.Item>
            <ListGroup.Item>상품 가격: {product.price}</ListGroup.Item>
            <ListGroup.Item>상품 수량: {product.quantity}</ListGroup.Item>
            <ListGroup.Item>상품 설명: {product.description}</ListGroup.Item>
            <ListGroup.Item>상품 등록일:{product.created_at}</ListGroup.Item>
           
            <ListGroup.Item >{images}</ListGroup.Item>
            </ListGroup>
        <br/>
        </Col>
        </Row>
        <ListGroup>
            {orders.length==0?
            <div>
            <br/>
            <p>구매한 사람이 없습니다.</p>
            </div>
            :orders}
        </ListGroup>
        </Container>
        

    </div>)
}

export default MySalesDetail;