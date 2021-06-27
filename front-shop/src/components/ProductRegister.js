import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {Form, Container, Button} from 'react-bootstrap'
import Banner from './Banner'

function ProductRegister(){

    const [product, setProduct] = useState({
        name: "",
        category_id: null,
        price: null,
        quantity: null,
        description: "",


    })

    
    const {name, category_id, price, quantity, description} = product;

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        })
        console.log(product)

    };
    const onClickHandler = (e)=>{
        e.preventDefault();
        let body = {
            seller_id: 4,
            name: name,
            category_id: 2,
            price: price,
            quantity: quantity,
            description: description,
        };
        
        axios.post('/apis/v1/product/', body)
        .then(response => {
            // props.history.push('/')
            console.log("상품 등록 성공")
            // dispatch(loginAction(response.data.payload))
            alert("상품 등록 성공")
        }).catch(e =>{
            alert("상품 등록 실패")
            console.log("상품 등록 실패")
        })

    }
    
    return(<div>
   
        <Banner/>

        <br/>
        <Container>
            <Form onSubmit={onClickHandler} >

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
            <Button type="submit">등록</Button>
            </Form>
        </Container>
            
    </div>

    );

}

export default ProductRegister;