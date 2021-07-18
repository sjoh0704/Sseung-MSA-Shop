import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'



function MySalesDetail({history, match}){
    const [orders, setOrders] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))
    const[images,setImages]= useState([])
    const[product,setProduct]= useState({})
    const fetchProduct= async ()=>{
        await axios.get('/apis/v1/product/' + match.params.number).then(res=> {
            console.log(res.data)
            setProduct({
            ...res.data.payload.payload,
            product_id: match.params.number
            });
            let image_list = res.data.payload.payload.image.map(img => (<div >
                <br/>
                <img style = {{  
                    width: "40vw",
                    }} src={img}></img>
                <br/>
                <br/>
                
            </div>))
            setImages(image_list);
            
        })
        .catch(e => {
            // 정보가 없을 때 처리
            console.log('없는 상품 정보')
        })
    }
    
    



    const fetchOrders= async()=>{
            await axios.get('/apis/v1/order/sale/' + match.params.number).then(res=> {
      
                let tmp_orders = res.data.payload.payload.filter(order=> order.sales_stage!='SO')
                
                console.log(tmp_orders)
                let orderlist = tmp_orders.map((order, index) => {
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
                            구매량: {order.demand_quantity}
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
        fetchProduct()
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