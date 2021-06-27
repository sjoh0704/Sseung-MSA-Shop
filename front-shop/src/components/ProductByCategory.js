import Banner from './Banner'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import {DisplayProducts} from './Home'
import {Container} from 'react-bootstrap'
import Title from './Title';

function ProductByCategory(){
    const[products,Setproducts]= useState([])
    const fetchProducts= async ()=>{
        await axios.get('/apis/v1/category/3').then(res=> {
            let product_list = res.data.map(data=> {
                return data.fields
            })
            Setproducts(product_list);
        })
    }

    useEffect(()=>{
        fetchProducts();
   
    },[])

    return(<div>
        <Title title="카테고리 상품"></Title>
        <Container>
        <DisplayProducts products={products}/>
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory