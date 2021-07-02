import {ListGroup, Container} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import Title from './Title'

function ProductDetail({match}){
    console.log(match.params.number)
    const[product,setProduct]= useState({
    })
    const fetchProduct= async ()=>{
        await axios.get('/apis/v1/product/' + match.params.number).then(res=> {
            console.log(res.data.payload.payload)
            setProduct(res.data.payload.payload);
        
        })
        .catch(e => {
            // 정보가 없을 때 처리
            alert('없는 상품 정보')
        })
    }

    useEffect(()=>{
        
            fetchProduct()
        
    },[match.params.number])
    return(
        <div>
        <Title title= {product.name}></Title>
        <Container>
            <ListGroup>
            <ListGroup.Item>{product.category}</ListGroup.Item>
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item>{product.price}</ListGroup.Item>
            <ListGroup.Item>{product.quantity}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>{product.created_at}</ListGroup.Item>
            </ListGroup>
            
        </Container>

        </div>
        
    )
}

export default ProductDetail