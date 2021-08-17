import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Dropdown, DropdownButton, Card} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'
import { CategoryDirection } from './CategoryBanner'
import EmptyBox from '../images/box.png'
import {setMoney, setDate} from './Convenient'

function MySalesDetail({history, match}){
    const [btnValue, setBtnValue] = useState('')
    const [orders, setOrders] = useState([]) 
    const[images,setImages]= useState([])
    const[product,setProduct]= useState({})
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))

    const fetchProduct= async ()=>{
        let res = await axios.get('/apis/v1/product/' + match.params.number)
           
            setProduct({
            ...res.data.payload.payload,
            product_id: match.params.number
            });
            let image_list = await res.data.payload.payload.image.map(img => (<div >
                <br/>
                <img style = {{  
                    maxWidth: "100%",
                    height:'auto' 
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
                    <p style={{fontSize:'1.5rem'}}>
                    ID: {order.user_name}
                    </p>
                    <p style={{fontSize:'1.5rem'}}>
                    이메일: {order.user_email}
                    </p>
                    <p style={{fontSize:'1.5rem'}}>
                    연락처: {order.phone_number}
                    </p>
                    <p style={{fontSize:'1.5rem'}}>
                    구매량: {order.demand_quantity}
                    </p>
                    <p style={{fontSize:'1.5rem'}}>
                    지불 금액: {setMoney(order.price)} 원
                    </p>
                    <p style={{fontSize:'1.5rem'}}>
                    구매 날짜: {setDate(order.created_at)}
                    </p>
                    <DropdownButton id="dropdown-basic-button" title={btnValue?btnValue:sale_status} size='lg'>
                    <Dropdown.Item onClick={(e) => {onClickHandler({order, product_id:match.params.number}, e)}} name='예약 중'>예약 중</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {onClickHandler({order, product_id:match.params.number}, e)}} name='판매 완료'>판매 완료</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {onClickHandler({order, product_id:match.params.number}, e)}} name='거래 취소'>거래 취소</Dropdown.Item>
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
    

    const onClickHandler = async (orderData, e)=>{
        const {product_id, order} = orderData;
        
        if(e.target.name  === '판매 완료'){
            
            alert('거래가 완료되셨습니까?')

            let data = {sales_stage: "SO", 
            product_id,
            demand_quantity: order.demand_quantity,
            total_quantity: order.total_quantity
            };

            axios.post('/apis/v1/order/' + order.order_id, data).then(res=> {
                alert('거래가 성사되었습니다.')
                
            })
            .catch(e=>{
                alert('잘못되었습니다.')
            })
      
        }
        else if(e.target.name  === '예약 중'){
            alert('거래를 예약하시겠습니까?')
            let data = {sales_stage: "SR"}
            axios.post('/apis/v1/order/' + order.order_id, data).then(res=> {
                console.log(res)
                alert('거래가 예약되었습니다.')
            })
            .catch(e=>{
                alert('예약에 실패했습니다. 판매자에게 문의하세요')
            })
        }
        else{
            alert('주문 요청을 취소하시겠습니까?')
 
            axios.delete('/apis/v1/order/' + order.order_id).then(res=> {
                
                alert('주문이 취소되었습니다.')
            })
            .catch(e=>{
                alert('Error')
            })

        }      
        setBtnValue(e.target.name)
    }
  


    return (<div>
        

        <Container>
        
        
              
    
        <CategoryDirection tag1={"내 상품 목록"} tag2={product.name}></CategoryDirection>
        <ListGroup>
            {orders.length==0?
            <div>
            <br/>
            <p style={{fontSize:"1.7rem", }}>아직 주문한 사람이 없네요...</p>
            <img style={{maxWidth:'50%', height:'auto'}}src={EmptyBox}></img>
            </div>
            :<div>
                <br/>
                <p style={{fontSize:'1.6rem', fontWeight:'bold', margin:20}}>구매자 정보</p>
                {orders}
            </div>}
        </ListGroup>
        
        <Accordion style={{marginTop:100}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" >
                        <p style={{fontSize:'1.7rem', margin:15}}>
                            내 상품 확인하기 
                        </p>
                
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <Row className="justify-content-md-center">
                            <Col>
                            <ListGroup>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>카테고리: {product.category}</ListGroup.Item>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>상품명: {product.name}</ListGroup.Item>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>가격: {setMoney(product.price)} 원</ListGroup.Item>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>수량: {product.quantity}</ListGroup.Item>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>설명: {product.description}</ListGroup.Item>
                            <ListGroup.Item style={{fontSize:'1.3rem'}}>등록일: {setDate(product.created_at)}</ListGroup.Item>
                        
                            <ListGroup.Item >{images}</ListGroup.Item>
                            </ListGroup>
                            <br/>
                        </Col>
                        </Row>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                
        </Accordion>


        
       
        </Container>
        

    </div>)
}

export default MySalesDetail;