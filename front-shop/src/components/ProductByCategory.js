import {useSelector} from 'react-redux'
import axios from 'axios'
import React, {useEffect, useState} from 'react';
import DisplayProducts from './DisplayProduct'
import {Container} from 'react-bootstrap'
import Title from './Title';
import Loading from './Loading';

function ProductByCategory({match}){
    console.log(match.params.number)
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    console.log(kind)
    const[products,Setproducts]= useState([])
    const fetchProducts= async ()=>{
        await axios.get('/apis/v1/category/' + match.params.number).then(res=> {
            let product_list = res.data.payload.payload.map((data, index)=> {
                return {
                    ...data,
                    id: data.pk
                }
            })
            Setproducts(product_list);
            console.log(products)
        })
    }

    useEffect(()=>{
        fetchProducts()
   
    },[match.params.number])

    return(<div>
        <Title title={kind[match.params.number-1].kind} set_middle={false}></Title>
        <Container>
        <Loading products={products}></Loading>
        </Container>
       
          
        
    </div>)
}

export default ProductByCategory