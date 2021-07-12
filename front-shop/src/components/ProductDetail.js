import {ListGroup, Container, Button, Form, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Title from './Title'
import { Link } from 'react-router-dom'
import PurchasePage from './PurchasePage'

function ProductDetail({match, history}){
    const [amount, setAmount] = useState(1)
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))

    const[images,setImages]= useState([])
    const[product,setProduct]= useState({})
    const fetchProduct= async ()=>{
        await axios.get('/apis/v1/product/' + match.params.number).then(res=> {
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
            
        })
        .catch(e => {
            // 정보가 없을 때 처리
            alert('없는 상품 정보')
        })
    }
    useEffect(()=>{
        
            fetchProduct()
        
    },[match.params.number])

    const onClickOrder = () => {
        if(isLoggedIn === false || userData == null){
            alert("로그인 후 이용하세요.")
            history.replace('/login')
        }
        if(amount > product.quantity){
            alert("수량이 잘못 되었습니다. ")
            return; 
        }

    }

    const onClickWishList = () => {
        if(isLoggedIn === false){
            alert("로그인 후 이용하세요.")
            return;
        }


    }

    const onChangeHandler = (e) => {
        const {value} = e.target
        if(value < 1){
            alert("올바르지 않습니다.")
            return;
        }

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
        <Button onClick={onClickWishList}>장바구니</Button>{' '}
        
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