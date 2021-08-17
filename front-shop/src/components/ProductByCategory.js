import {useSelector} from 'react-redux'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DisplayProducts from './MakeCard'
import {Container} from 'react-bootstrap'
import Title from './Title';
import Loading from './Loading';
import { CategoryDirection } from './CategoryBanner';
import { EmptyCheckProductByCategory } from './EmptyCheck';

function ProductByCategory({match}){
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    const[products,setProducts]= useState([])


    const fetchProducts= async ()=>{
        let res = await axios.get('/apis/v1/category/' + match.params.number);
        console.log(res);
        let filtered_product_list = res.data.payload.payload.filter(product=> product.valid==true);
        let product_list = filtered_product_list.map((data)=> {
            return {
                ...data,
                id: data.pk
            }
        });
        console.log(product_list);
        setProducts(product_list);
        
    }

    useEffect(()=>{
        fetchProducts()
   
    },[match.params.number])

    return(<div>
        
        <Container>
        <CategoryDirection tag1={kind[match.params.number-1].kind}></CategoryDirection>
        
        <EmptyCheckProductByCategory text="등록된 물건이 없습니다." items={products}>
            
        </EmptyCheckProductByCategory>
    
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory