import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../images/placeholder2.jpg'
import { Link } from 'react-router-dom'
import EmptyCheck from './EmptyCheck'
import {setDate, setMoney} from './Convenient'
import { CategoryDirection } from './CategoryBanner'



function MySales({history}){
 
    const [products, setProducts] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            const res = await axios.get('/apis/v1/product/user/' + userData.user_id);
            let productlist = res.data.payload.payload.map((product, index) => {
                
                let path = '/mysales/' + product.pk
                return (
                       
                    <Link style={{textDecoration:'none', color:'inherit'}} key={index} to={path}>
                       
                        <ListGroup.Item key={index}>
                        <Row style={{margin:20}}>
                        <Col md={4}>
                        <img style={{width:'22rem', height:'22rem'}} src={product.base64_image_url?product.base64_image_url:placeholder}></img>
                        </Col>
                      
                        <Col md={8}>
                        <div style={{marginLeft:20}}>
                        
                        <p style = {{fontSize:"1.5rem", fontWeight: 'bold', marginLeft:20}}>
                       {product.name}
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        총 수량: {product.quantity}
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        가격: {setMoney(product.price)} 원
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        등록 날짜: {setDate(product.created_at)}
                    
                        </p>

                        <p style={{fontSize:"1.3rem", marginLeft:20,color:'green', fontSize:20, fontWeight:'bold'}}>
                        주문한 사람이 있는지 확인해주세요!
                        </p>
                        <Button style={{fontSize:"1rem", marginLeft:20, }} onClick={(e)=>onDeleteProduct(product.pk, e)}>
                            상품 등록 취소
                        </Button>
                        
                        
                        
                        </div>
                        
                        </Col>
                        </Row>
                        </ListGroup.Item>
                        </Link>
                    
                );
            })
            setProducts(productlist);  
            
            
        
    }

    const onDeleteProduct = async (product_id, e) => {
        e.preventDefault();
        axios.delete(`/apis/v1/product/${product_id}`).then(res=> {
            alert('상품 등록을 취소합니다.');            
        })
        .catch(e => {
            alert('문제가 발생했습니다. 관리자에게 문의하세요');
        })

    }

    useEffect(()=>{
        fetchOrders()
    },[userData.user_id, products])
    

    

    return (<div>
       <Container>
       <CategoryDirection tag1={'내 상품 목록'}></CategoryDirection>
        

        <EmptyCheck text={"등록한 상품이 없습니다"} items={products}></EmptyCheck>
        </Container>
        

    </div>)
}

export default MySales;