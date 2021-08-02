import {ListGroup, Container, Button, Form, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Title from './Title'
import { Link } from 'react-router-dom'
import EmptyHeartImg from "../images/heart.png"; 
import HeartImg from "../images/heart_pressed.png";
import xxx from '../images/placeholder.jpg'

function ProductDetail({match, history}){
    const [amount, setAmount] = useState(1)
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }));
    const [like, setLike] = useState({checked: false});

    const[images,setImages]= useState([]);
    const[product,setProduct]= useState({});
    const fetchProduct= async ()=>{
            let res = await axios.get('/apis/v1/product/' + match.params.number);
            console.log(res.data)
            setProduct({
            ...res.data.payload.payload,
            product_id: match.params.number
            });
            let image_list = res.data.payload.payload.image.map(img => (<div >
                <br/>
                <img style = {{  
                    width: "40vw",
                    }} src={img}></img>
                <br/>
                <br/>
                
            </div>))
            setImages(image_list);
            
            // check likes
            let body = {
                seller_id: res.data.payload.payload.seller_id,
                buyer_id: userData.user_id,
                product_id: parseInt(match.params.number)
            };
            let res_likes = await axios.post('/apis/v1/carts/check', body);
            setLike(res_likes.data.payload.payload);
    }
    
    useEffect(()=>{
        
            fetchProduct();
        
    },[match.params.number, like.checked])

    const onClickOrder = (e) => {
        if(isLoggedIn === false || userData == null){
            alert("로그인 후 이용하세요.")
            history.replace('/login')
           
        }
        else if(userData.user_id == product.seller_id){
            alert("판매자가 구매할 수 없습니다.")
            e.preventDefault()
        }
        else if(amount < 1 || amount > product.quantity){
            alert("수량이 올바르지 않습니다.")
            e.preventDefault()
            
        }
    
        

    }

    const onClickCart = async() => {
        if(isLoggedIn === false){
            alert("로그인 후 이용하세요.")
            return;
        }
        console.log(like)

        if(like.checked){
   
            await axios.delete(`/apis/v1/carts/${like[0]._id}`);
            setLike({checked: false});
        }
        else{
            let body = {
                seller_id: product.seller_id,
                buyer_id: userData.user_id,
                product_id: parseInt(product.product_id)
            };
            await axios.post('/apis/v1/carts/', body);
            setLike({checked:true});

        }
        console.log(like)
    }

    const onChangeHandler = (e) => {
        const {value} = e.target
        setAmount(parseInt(value))
    }
    
  


    return(
        <div>
        <Title title= {product.name}></Title>
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={10}>
                <ListGroup>
            <ListGroup.Item>상품 카테고리: {product.category}</ListGroup.Item>
            <ListGroup.Item>상품명: {product.name}</ListGroup.Item>
            <ListGroup.Item>상품 가격: {product.price}</ListGroup.Item>
            <ListGroup.Item>상품 수량: {product.quantity}</ListGroup.Item>
            <ListGroup.Item>상품 설명: {product.description}</ListGroup.Item>
            <ListGroup.Item>상품 등록일:{product.created_at}</ListGroup.Item>

            <ListGroup.Item >{images}</ListGroup.Item>
            </ListGroup>
        <br/>
        <Row>
            <Col xs lg="2">
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>구매 수량</Form.Label>
            <Form.Control type='number' onChange={onChangeHandler} value={amount} />
            </Form.Group>
            </Form>
            
            </Col>
        </Row>
        
        
        <br/>
        <br/>
        {/* <Button style ={like.checked?{color:"red"}: {color:'blue'}}onClick={onClickCart}>장바구니</Button>{' '} */}
        {/* <img src={xxx} onClick={onClickCart}>장바구니</img>{' '} */}
        {/* <img src={xxx} onClick={onClickCart}>장바구니</img>{' '} */}
        <Link to={isLoggedIn?{
            pathname: `/purchase`,
            state: {
                product:product,
                demand_amount:amount,
            }
          }:'/product/' + match.params.number}><Button onClick={onClickOrder}>구매하기</Button></Link>
                </Col>
            </Row>
            
      
        </Container>

        </div>
        
    )
}

export default ProductDetail