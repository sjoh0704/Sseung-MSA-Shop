import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
// import ComplexNavigationBar from "../Common/ComplexNavigationBar/ComplexNavigationBar";
// import Post from "../LoggeHome/Post";
// import ComplexNavigationNonLogged from "./ComplexNavigationNonLogged";
import Carousel from "react-bootstrap/Carousel";
import {Button, Container, Row,Col, Card} from 'react-bootstrap'

// import NonLoggedPost from "./NonLoggedPost";



const DisplayProducts = ({products}) =>{
    products = products.map(product => {
        return (
            
                <Col xs>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                        {product.description}
                        </Card.Text>
                        <Button variant="primary">사러가기</Button>
                        <Button variant="primary">장바구니</Button>
                    </Card.Body>
                    </Card>
                </Col>
            
                )

    })
    return (
        
        <Row>
            {products}
                {/* <Row>
                    <Col xs>First, but unordered</Col>
                    <Col xs={{ order: 12 }}>Second, but last</Col>
                    <Col xs={{ order: 1 }}>Third, but second</Col>
                </Row>
                <Row>
                    <Col xs>First, but unordered</Col>
                    <Col xs={{ order: 12 }}>Second, but last</Col>
                    <Col xs={{ order: 1 }}>Third, but second</Col>
                </Row>
                <Row>
                    <Col xs>First, but unordered</Col>
                    <Col xs={{ order: 12 }}>Second, but last</Col>
                    <Col xs={{ order: 1 }}>Third, but second</Col>
                </Row> */}
        </Row>
    )
};

export default function Home(props){

    const[userId,setUserID]= useState(0)
    const[products,Setproducts]= useState([])

    const fetchProducts= async ()=>{
        await axios.get('/apis/v1/product').then(res=> {
            console.log(res.data);
            let product_list = res.data.map(data=> {
                return data.fields
            })
            
            console.log(product_list)
            Setproducts(product_list);
        })
    }

    useEffect(()=>{
        fetchProducts();
    },[])



    // const filterproducts=(catname)=>{
    //     axios.post('http://localhost:8080/filterbycat',{"category":catname}).then(res=>{
    //         Setproducts(res.data)
    //     })
    // }

    // const searchproducts=(products1)=>{
    //     Setproducts(products1)
    // }




        return (
            <div>
        
                <div>
                    seungju shop
                </div>
                <div style={{marginTop:70}}>
                <ControlledCarousel/>
                <Container>
                    <DisplayProducts products={products}/>
                </Container>
               

                </div>
            </div>
        );
}

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="First slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>First slide label ~~~~</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/b1/68/2d/b1682d7c5579f8ce81b8df8088db43a1.jpg"
                    alt="Second slide"
                    width="800"
                    height="400"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>아무거나 적어 </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://img.freepik.com/free-vector/big-fashion-shop-super-market-male-clothes-shopping-mall-interior-banner-with-copy-space_48369-11918.jpg?size=626&ext=jpg"
                    alt="Third slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                    세번째
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}