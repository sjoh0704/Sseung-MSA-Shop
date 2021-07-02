import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setCategory} from '../modules/category'
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import {Container, Navbar} from 'react-bootstrap'
import DisplayProducts from './DisplayProduct'




export default function Home(props){
    const[products,Setproducts]= useState([])

    const dispatch = useDispatch()

    const fetchProducts= async ()=>{
        await axios.get('/apis/v1/product').then(res=> {
            console.log(res)
            let product_list = res.data.payload.map(data=> {

                return  {
                    ...data.fields,
                    id: data.pk
                }
            })
            Setproducts(product_list);
            console.log(product_list)
        })
    }
    const fetchCategory= async ()=>{
        await axios.get('/apis/v1/category').then(res=> {
            let category_list = res.data.payload.map(data=> {
                return data.fields
            })
           
            console.log(category_list);
            dispatch(setCategory(category_list))
        })
    }

    useEffect(()=>{
        fetchProducts();
        fetchCategory();
    },[])
        return (
            <div>
                <br/>
                <div style={{marginTop:30}}>
                <Navbar bg="primary" variant="dark" />
                
                <ControlledCarousel/>
                <Navbar bg="primary" variant="dark" />
                <br/>
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