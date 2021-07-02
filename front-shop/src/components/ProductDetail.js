import {ListGroup, Container, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Title from './Title'

function ProductDetail({match}){
    const [amount, setAmount] = useState(1)
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))



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

    const orderProduct= async ()=>{
        let body = {
            ...product,
            user_id: userData.user_id,
            demand_amount: amount,
        };
        console.log(body)
        await axios.post('/apis/v1/order/' + match.params.number, body).then(res=> {
            console.log(res.data.payload.payload)
            alert('주문 성공')
        })
        .catch(e => {
            // 정보가 없을 때 처리
            alert('주문 실패')
        })
    }
    useEffect(()=>{
        
            fetchProduct()
        
    },[match.params.number])

    const onClickOrder = () => {
        if(isLoggedIn === false){
            alert("로그인 후 이용하세요.")
            return;
        }
        if(amount > product.quantity){
            alert("수량이 잘못 되었습니다. ")
            return; 
        }

        orderProduct();
    }

    const onClickWishList = () => {
        if(isLoggedIn === false){
            alert("로그인 후 이용하세요.")
            return;
        }
    }

    const onChangeHandler = (e) => {
        const {value} = e.target
        setAmount(parseInt(value))
    }

    return(
        <div>
        <Title title= {product.name}></Title>
        <Container>
            <ListGroup>
            <ListGroup.Item>{product.category}</ListGroup.Item>
            <ListGroup.Item>상품명 / {product.name}</ListGroup.Item>
            <ListGroup.Item>상품 가격 / {product.price}</ListGroup.Item>
            <ListGroup.Item>상품 수량 / {product.quantity}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>{product.created_at}</ListGroup.Item>
            </ListGroup>
        <br/>
        <p>구매 수량</p>
        <input type='number' onChange={onChangeHandler}value={amount}></input>
        <br/>
        <br/>
        <Button onClick={onClickWishList}>장바구니</Button>{' '}
        <Button onClick={onClickOrder}>구매하기</Button>
        </Container>

        </div>
        
    )
}

export default ProductDetail