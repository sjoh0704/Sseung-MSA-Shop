import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'




function Likes({history}){
    // var products = []
    const [carts, setCarts] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



        const fetchCarts= async()=>{
            let res = await axios.get('/apis/v1/carts/users/' + userData.user_id);
            let cartList = res.data.payload.payload;
            let res_product = await axios.get('/apis/v1/product/');
            let productList = res_product.data.payload.payload;
            console.log(cartList);
            console.log(productList);
            
            cartList = cartList.map((cart, index) => {
                
                const tmp_product = productList.find((product) => product.pk == cart.productId);
                return (
                    <div>
                        <ListGroup.Item key={index}>
                        <Row style={{margin:20}}>
                        <Col md={4}>
                        <img style={{width:'22rem'}} src={tmp_product.base64_image_url}></img>
                        </Col>
                        <Col md={8}>
                    <div style={{marginLeft:20}}>
                        
                        <p>
                        상품명: {tmp_product.name}
                        </p>
                        <p>
                        수량: {tmp_product.quantity}
                        </p>
                        <p>
                        지불 금액: {tmp_product.price}
                        </p>
                        <p>
                        찜한 날짜: {cart.createdAt}
                        </p>
                        <p>
                        {/* 주문 상태: {cart.sales_stage=='S'? */}
                        {/* <span style={{color:'red'}}>판매자의 확인을 기다려주세요</span>:<span style={{color:'green'}}>예약되었습니다! 판매자와 거래하세요</span>} */}
                        </p>
                        {/* <Button onClick={()=>{
                            // connectSeller(cart.seller_id)
                        }}>판매자에게 연락하기</Button> */}
        
                        <br/>
                        
                        </div>
                        
                        </Col>
                        </Row>
                        </ListGroup.Item>
                    </div>
                    
                );

            });

            setCarts(cartList);
            // let tmp_carts = res.data.payload.payload.filter(cart=> cart.sales_stage!='SO')
            // let cartList = res.data.payload.payload.map((cart, index) => {
            //     return (
                        
                        
                
                    
            // );
            // })
            // setcarts(cartlist);  

            
        }

    useEffect(()=>{
        fetchCarts()
    },[userData.user_id])
    

    // const connectSeller = async(seller_id) => {
    //     let res = await axios.get(`/apis/v1/user/${seller_id}`)
    //     let tmp = res.data.payload.payload.phone_number
    //     let phone_number = tmp.slice(0,3) + '-'+tmp.slice(3,7) + '-'+tmp.slice(7,11) 
    //     alert(`[${phone_number}]로 연락해주세요!`)
    // }
    

    
    const result =() => {

        if(carts.length == 0){
            return(<Row>
                    <Col>
                        <h2>찜한 상품이 없습니다.</h2>
                    </Col>
                </Row>)
        }
        else{
            return(  <ListGroup>
                        {carts}
                </ListGroup>);
        }

    }

    return (<div>
        <Title title="찜 목록" set_middle={false}></Title>
        <Container>
          {result()}
        </Container>
        

    </div>)
}

export default Likes;