import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setCategory} from '../modules/category'
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import {Container, Navbar, Spinner} from 'react-bootstrap'
import Loading from './Loading'


export default function Home(props){
    const[products,Setproducts]= useState([])

    const dispatch = useDispatch()

    const fetchProducts= async ()=>{
        let res = await axios.get('/apis/v1/product');
        let product_list = res.data.payload.payload.filter(p => p.valid=== true);
        product_list = product_list.map(data=> {
                return  {
                    ...data,
                    id: data.pk
                }
            })
            Setproducts(product_list);
    }


    const fetchCategory= async ()=>{
        await axios.get('/apis/v1/category').then(res=> {
            let category_list = res.data.payload.map(data=> {
                return data.fields
            })
           
            console.log(category_list);
            dispatch(setCategory(category_list))
        }).catch((e) => {
            console.log(e)
        } )
    }

    useEffect(()=>{
        fetchProducts();
        fetchCategory();
    },[])

    
    

        return (
            <div>
                <br/>
                <div style={{marginTop:30}}>
                <Container>
                <ControlledCarousel/>
           
                </Container>
                
                <br/>
                <Container>
                <div style={{marginTop:30}}/>
                <h3>오늘의 상품 추천</h3>
 
                <hr/>
                <Loading products={products}/>
   
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
                    src="https://media.istockphoto.com/vectors/used-electronics-trading-concept-banner-header-vector-id1159672629"
                    alt="First slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                    <p>First slide label ~~~~</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://img.lovepik.com//back_pic/05/72/43/975bbd3c7e54c21.jpg_wh860.jpg"
                    alt="Second slide"
                    width="800"
                    height="400"
                />

                <Carousel.Caption>
                    {/* <h3>Second slide label</h3>
                    <p>아무거나 적어 </p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/b9/42/dd/b942dd80ac8cba56dd90dc539d2040c0.jpg"
                    alt="Third slide"
                    width="800"
                    height="400"
                />
                <Carousel.Caption>
                    {/* <h3>Third slide label</h3>
                    <p>
                    세번째
                    </p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}