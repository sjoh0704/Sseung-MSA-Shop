import {useSelector} from 'react-redux'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DisplayProducts from './MakeCard'
import {Container} from 'react-bootstrap'
import Title from './Title';
import Loading from './Loading';
import { CategoryDirection } from './CategoryBanner';

function ProductByCategory({match}){
    console.log(match.params.number)
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    console.log(kind)
    const[products,Setproducts]= useState([])
    const fetchProducts= async ()=>{
        let res = await axios.get('/apis/v1/category/' + match.params.number);
        console.log(res);
        let filtered_product_list = res.data.payload.payload.filter(product=> product.valid==true);
        let product_list = filtered_product_list.map((data, index)=> {
            return {
                ...data,
                id: data.pk
            }
        });
            
        Setproducts(product_list);
        
    }

    useEffect(()=>{
        fetchProducts()
   
    },[match.params.number])

    return(<div>
        
        <Container>
        <CategoryDirection tag1={kind[match.params.number-1].kind}></CategoryDirection>
       
        
       
        <Loading products={products}></Loading>
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory