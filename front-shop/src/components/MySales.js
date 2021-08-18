import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ListGroup, Container, Row, Col, Button} from 'react-bootstrap'
import Title from './Title'
import {useSelector} from 'react-redux'
import placeholder from '../assets/images/placeholder2.jpg'
import { Link } from 'react-router-dom'
import EmptyCheck from './EmptyCheck'
import {setDate, setMoney} from './Convenient'
import { CategoryDirection } from './CategoryBanner'



function MySales({history}){
    const [flag, setFlag] = useState(true);
    const [products, setProducts] = useState([]) 
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



    const fetchOrders= async()=>{
            const res = await axios.get('/apis/v1/product/user/' + userData.user_id);
            let product_list = res.data.payload.payload.filter(p => p.valid=== true);
            product_list = product_list.map((product, index) => {
                
                let path = '/mysales/' + product.pk
                return (
                       
                    <Link style={{textDecoration:'none', color:'inherit'}} key={index} to={path}>
                       
                        <ListGroup.Item key={index}>
                        <Row style={{margin:30}}>
                        <Col sm='6' lg='5' xs='12'>
                        <img style={{height: 'auto', maxWidth:'100%', height:'auto'}} src={product.base64_image_url?product.base64_image_url:placeholder}></img>
                        </Col>
                      
                        <Col sm='6' lg={{span:6, offset:1}} xs='12'>
                        <div style={{marginLeft:20, paddingTop:10}}>
                        
                        <p style = {{fontSize:"1.5rem", fontWeight: 'bold', marginLeft:20}}>
                       {product.name}
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        총 수량: {product.quantity}
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        가격: {setMoney(product.price)} ₩
                        </p>
                        <p style = {{fontSize:"1.3rem", marginLeft:20}}>
                        등록 날짜: {setDate(product.created_at)}
                    
                        </p>

                        <p style={{fontSize:"1.3rem", marginLeft:20,color:'green', fontSize:20, fontWeight:'bold'}}>
                        주문한 사람이 있는지 확인해주세요!
                        </p>
                        <Button  variant="outline-light" 
                        style={{fontSize:"1rem", marginLeft:20, background: '#e85255', fontSize:'1.3rem'}}
                        onClick={(e)=>onDeleteProduct(product.pk, e)}>
                            상품 등록 취소
                        </Button>
                        
                        
                        
                        </div>
                        
                        </Col>
                        </Row>
                        </ListGroup.Item>
                        </Link>
                    
                );
            })
            setProducts(product_list);  
            
            
        
    }

    const onDeleteProduct = async (product_id, e) => {
        e.preventDefault();
        axios.delete(`/apis/v1/product/${product_id}`).then(res=> {
            alert('상품 등록을 취소합니다.');    
            setFlag(!flag) ;
        })
        .catch(e => {
            alert('문제가 발생했습니다. 관리자에게 문의하세요');
        })

    }

    useEffect(()=>{
        fetchOrders()
    },[userData.user_id, flag]);
    

    

    return (<div>
       <Container>
       <CategoryDirection tag1={'내 상품 목록'}></CategoryDirection>
        

        <EmptyCheck text={"등록한 상품이 없습니다"} items={products}></EmptyCheck>
        </Container>
        

    </div>)
}

export default MySales;