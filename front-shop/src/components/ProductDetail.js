import {ListGroup, Container, Button, Form, Row, Col, ListGroupItem} from 'react-bootstrap'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import EmptyHeartImg from "../images/heart.png"; 
import HeartImg from "../images/heart_pressed.png";
import { CategoryDirection } from './CategoryBanner'
import { setMoney, setDate } from './Convenient'

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
            let image_list = res.data.payload.payload.image;
            setImages(image_list);
            
            // check likes
            
            if(isLoggedIn){
                let body = {
                    seller_id: res.data.payload.payload.seller_id,
                    buyer_id: userData.user_id,
                    product_id: parseInt(match.params.number)
                };
                let res_likes = await axios.post('/apis/v1/carts/check', body);
            setLike(res_likes.data.payload.payload);
            }
            
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

    const displayImages = () =>{
        console.log(images)
        if(images.length == 1){
            return(
                <p style = {{margin: 20, fontSize:"1.3rem"}}>
                    추가 이미지가 없습니다 
                </p>
            )
        }
        return(
            images.slice(1).map(img => (<div >
            <br/>
            <img style = {{  
                width: "60rem",
                }} src={img}></img>
            <br/>
            <br/>
            
        </div>)))
    }
    
  


    return(
        <div>
        <Container>
        <CategoryDirection tag1={product.category} tag2={product.name}/>
            <Row>
                <Col>
                <img style={{
                    width:600,
                    height:600
                }}src={images[0]}>
                </img>
         
                </Col>
                <Col>
                <Row style={{marginTop: 20}}>
                    <Col sm={10} >
                    <p style = {{fontSize:"2.2rem", fontWeight: 'bolder', marginLeft:20}}>{product.name}</p>
                    </Col>
                    <Col sm={2}>
                    <img style = {{width:'2rem', marginRight:15}} src={like.checked?HeartImg:EmptyHeartImg} onClick={onClickCart}></img>
                    </Col>

                </Row>
                <hr/>
              
                <p style = {{fontSize:"2rem", margin:20}}>{setMoney(product.price)} 원 </p>
                 <p style = {{fontSize:"2rem", margin:20}}>남은 수량: {product.quantity}</p>
                <Row style={{margin:20, marginTop:40}}>   
                    <Col md={3}>
                    <Form style = {{fontSize:"2rem"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control size='lg' type='number' onChange={onChangeHandler} value={amount} />
                    </Form.Group>
                    </Form>
                    
                    </Col>
 
                    <Col>
                    <Link to={isLoggedIn?{
                        pathname: `/purchase`,
                        state: {
                            product:product,
                            demand_amount:amount,
                        }}:'/product/' + match.params.number}>
                            <Button size="lg" onClick={onClickOrder}>구매하기</Button>
                    </Link>
                    
                    </Col>
                </Row>
                <p style = {{fontSize:"3em", margin:20}}>
                    {product.price?(product.price*amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):product.price*amount} 원</p>
      

                
                </Col>
                

            </Row>
          
            

            <Row style ={{marginTop:80}}>
                <Col>
                <ListGroup>
                    <ListGroupItem>
                    <p style = {{margin: 10, fontSize:"2rem"}}>상품 상세 </p>
                    </ListGroupItem>
                    <ListGroupItem>
                    {displayImages()}
                    </ListGroupItem>
                    <ListGroupItem>
                    <p style = {{margin:20, fontSize:"2rem"}}>{product.description}</p>
                
                    </ListGroupItem> 
                </ListGroup>
                </Col>
            </Row>
            
      
        </Container>

        </div>
        
    )
}

export default ProductDetail