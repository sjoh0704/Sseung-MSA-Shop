import Banner from './Banner'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import {DisplayProducts} from './Home'
import {Container} from 'react-bootstrap'

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
        <Banner/>
        <Container>
        <DisplayProducts products={products}/>
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory