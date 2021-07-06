import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {Form, Container, Button, Row, Col} from 'react-bootstrap'
import Banner from './Banner'
import Title from './Title'

function ProductRegister({history}){
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    console.log(kind)
    
    const displayCategory = kind.map((k, index) => {
        return (
            <option>{k.kind}</option>
           
        );
    }
    );
        
    if(isLoggedIn === false){
        alert('로그인 먼저 해주세요')
        history('/login')
    }


    const [product, setProduct] = useState({
        name: "",
        category: null,
        price: null,
        quantity: null,
        description: "",


    })

    
    const {name, category, price, quantity, description} = product



    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        })
        console.log(product)

    };
    const onClickHandler = (e)=>{
        let category_id = kind.findIndex((k) => k.kind === category) + 1

        e.preventDefault();
        let body = {
            seller_id: userData.user_id,
            name: name,
            category_id: category_id,
            price: price,
            quantity: quantity,
            description: description,
        };
  
    
        axios.post('/apis/v1/product/', body)
        .then(response => {
            alert("상품 등록 성공")
            history.replace('/')
        }).catch(e =>{
            alert("상품 등록 실패")
     
        })

    }

    
    return(<div>
        <Title title="REGISTER PRODUCT"></Title>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg={8}>
                <Form onSubmit={onClickHandler} >

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select"
                name = 'category'
                onChange={onChangeHandler}
                value = {category}>
                {displayCategory}

                </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>상품명</Form.Label>
                <Form.Control 
                name = 'name'
                value = {name}
                onChange={onChangeHandler}
                placeholder="상품명을 적어주세요" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>가격</Form.Label>
                <Form.Control
                name = 'price'
                value = {price} 
                onChange={onChangeHandler}
                placeholder="가격을 적어주세요" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>수량</Form.Label>
                <Form.Control
                name = 'quantity'
                value = {quantity} 
                onChange={onChangeHandler}
                placeholder="수량을 적어주세요" />
            </Form.Group>
            {/* 
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>사진</Form.Label>
                <Form.Control placeholder="name@example.com" />
            </Form.Group> */}



            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>상품 설명</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={5}
                onChange={onChangeHandler}
                name = 'description'
                value = {description}
                />
            </Form.Group>
            <br/>
            <Button type="submit">등록</Button>
            </Form>
                            
                </Col>
            </Row>

        </Container>
            
    </div>

    );

}

export default ProductRegister;