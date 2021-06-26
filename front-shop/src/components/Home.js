import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
// import ComplexNavigationBar from "../Common/ComplexNavigationBar/ComplexNavigationBar";
import {Container, Grid} from "@material-ui/core";
// import Post from "../LoggeHome/Post";
// import ComplexNavigationNonLogged from "./ComplexNavigationNonLogged";
import Carousel from "react-bootstrap/Carousel";
// import NonLoggedPost from "./NonLoggedPost";

export default function Home(props){

    const[userId,setUserID]= useState(0)
    const[products,Setproducts]= useState([])

    const fetchProducts= async ()=>{
        await axios.get('http://localhost:8080/getallproducts').then(res=> {
            Setproducts(res.data);
        })
    }
    useEffect(()=>{
        fetchProducts();
    },[userId])

    const filterproducts=(catname)=>{
        axios.post('http://localhost:8080/filterbycat',{"category":catname}).then(res=>{
            Setproducts(res.data)
        })
    }

    const searchproducts=(products1)=>{
        Setproducts(products1)
    }




        return (
            <div>
                <div style={{marginTop:70}}>
                <ControlledCarousel/>
                </div>
                <Container maxWidth={"xl"} style={{marginLeft:'5%'}}>
                    <Grid container spacing={1} style={{display:"flex",marginTop:'50px'}}>
                        {
                            products.map(product=>{
                                return (
                                    <Grid container item xs={4} spacing={4} style={{margin:'00px'}} className="gridItem">
                                        {/* <NonLoggedPost product={product} dispatch={props.dispatch} setproduct={props.setproduct}/> */}
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
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