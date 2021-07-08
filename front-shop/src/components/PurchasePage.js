import {ListGroup, Container, Button, Form, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Title from './Title'

function PurchasePage({location, history}){
    const {product, demand_amount} = location.state
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))
    console.log(product)
    console.log(demand_amount)
    
    const [purchaseData, setPurchaseData] = useState({
        address: null,
        email_address: null
    })
    const {address, email_address} = purchaseData

    const orderProduct= async ()=>{
        let body = {
            ...product,
            product_id: product.product_id,
            seller_id: product.seller_id,
            buyer_id: userData.user_id,
            demand_amount: demand_amount,
            address:address,
            quantity: product.quantity,
            email_address: email_address,
        };
        console.log(body)
        await axios.post('/apis/v1/order/', body).then(res=> {
            
            alert('주문 성공')
            history.replace('/orderlist')
        })
        .catch(e => {
            // 정보가 없을 때 처리
            alert('주문 실패')
        })
    }


    const onClickOrder = () => {
        if(isLoggedIn === false){
            alert("로그인 후 이용하세요.")
            return;
        }
        if(address == null || email_address == null){
            alert('모두 입력해주세요')
            return;
        }
        orderProduct();
        
    }

    const onChangeHandler = (e) => {
        const {name, value} = e.target
        setPurchaseData(
            {
                ...purchaseData,
                [name]:value
            })
        

    }

    return(
        <div>
        <Title title= {product.name}></Title>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="8">
                <ListGroup>
            <ListGroup.Item>{product.category}</ListGroup.Item>
            <ListGroup.Item>상품명 / {product.name}</ListGroup.Item>
            <ListGroup.Item>상품 가격 / {product.price}</ListGroup.Item>
            <ListGroup.Item>상품 수량 / {product.quantity}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>{product.created_at}</ListGroup.Item>
            </ListGroup>
            
        <br/>
        <br/>
        <br/>
        <h3>구매 정보를 입력하세요</h3>
        <hr/>

        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>구매 수량</Form.Label>
                <Form.Control 
                name = 'demand_amount'
                value = {demand_amount}
                disabled
                />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                name = 'email_address'
                value = {email_address}
                onChange={onChangeHandler}
                placeholder="배송 정보를 받을 이메일을 적어주세요" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                name = 'address'
                value = {address} 
                onChange={onChangeHandler}
                placeholder="배송지를 적어주세요" />
            </Form.Group>

            
            </Form>
            <br/>
        <h1>총 가격: {product.price * demand_amount}원</h1>
            <br/>
        <Button onClick={onClickOrder}>구매하기</Button>
        
                </Col>
            </Row>
       
        </Container>

        </div>
        
    )
}

export default PurchasePage