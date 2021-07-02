import Banner from './Banner'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DisplayProducts from './DisplayProduct'
import {Container} from 'react-bootstrap'
import Title from './Title';

function ProductByCategory({match}){
    console.log(match.params.number)
    const[products,Setproducts]= useState([])
    const fetchProducts= async ()=>{
        await axios.get('/apis/v1/category/' + match.params.number).then(res=> {
            let product_list = res.data.payload.map(data=> {
                return data.fields
            })
            Setproducts(product_list);
            console.log(products)
        })
    }

    useEffect(()=>{
        fetchProducts()
   
    },[match.params.number])

    return(<div>
        <Title title="카테고리 상품"></Title>
        <Container>
        <DisplayProducts products={products}/>
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory