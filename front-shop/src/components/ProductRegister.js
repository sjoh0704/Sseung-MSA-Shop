import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {Form, Container, Button, Row, Col} from 'react-bootstrap'
import Title from './Title'
import ImageUploading from 'react-images-uploading';



function ImageUpload() {

  const [images, setImages] = useState([]);
  const maxNumber = 4;

  const onChangeImage = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // 추가
  const onError = (errors, files) => {
    if(errors.maxNumber) {
      alert(`이미지는 ${maxNumber}개까지만 첨부할 수 있습니다`)
    }
  }

  
  // const onClickGetImage = async () => {
    
  //   let imageList = await axios.get("/apis/image/product").then(res => {
      
  //     return(res.data.map(data => {
  //       return {
  //         data_url: data.fields.base64_image_url}
  //     }))
  //   })
  //   .catch(e => {
  //     console.log(e)
  //   })

  //   console.log(imageList)

  // }



  return (
    <Container>
     
    </Container>
  )
}



function ProductRegister({history}){
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }))
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    const [images, setImages] = useState([]);
    const maxNumber = 4;
  
    const onChangeImage = (imageList, addUpdateIndex) => {
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    const onError = (errors, files) => {
      if(errors.maxNumber) {
        alert(`이미지는 ${maxNumber}개까지만 첨부할 수 있습니다`)
      }
    }
  
    
    // const onClickGetImage = async () => {
      
    //   let imageList = await axios.get("/apis/image/product").then(res => {
        
    //     return(res.data.map(data => {
    //       return {
    //         data_url: data.fields.base64_image_url}
    //     }))
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })
  
    //   console.log(imageList)
  
    // }
    
    const displayCategory = kind.map((k, index) => {
        return (
            <option>{k.kind}</option>
           
        );
    }
    );
        
    if(isLoggedIn === false){
        alert('로그인 먼저 해주세요')
        history.replace('/login')
    }


    const [product, setProduct] = useState({
        name: "",
        category: kind[0].kind,
        price: null,
        quantity: 1,
        description: "",

    })

    
    const {name, category, price, quantity, description} = product
    


    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        })
        console.log(product)
    };


    const onClickHandler = (e)=>{
        let category_id = kind.findIndex((k) => k.kind === category) + 1
        let image_list = images.map((img, index) => (img.data_url))
        e.preventDefault();
        let body = {
            seller_id: userData.user_id,
            name: name,
            category_id: category_id,
            price: price,
            quantity: quantity,
            description: description,
            ...image_list
        };
        console.log(body)
  
    
        axios.post('/apis/v1/product/', body)
        .then(response => {
            alert("상품 등록 성공")
            history.replace('/')
        }).catch(e =>{
            alert("상품 등록 실패")
     
        })

    }

    
    return(<div>
        <Title title="REGISTER PRODUCT"></Title>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg={8}>
                {/* <Form onSubmit={onClickHandler} > */}
                <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>카테고리</Form.Label>
                <Form.Control as="select"
                name = 'category'
                onChange={onChangeHandler}
                value = {category}>
                {displayCategory}

                </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>상품명</Form.Label>
                <Form.Control 
                name = 'name'
                value = {name}
                onChange={onChangeHandler}
                placeholder="상품명을 적어주세요" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>가격</Form.Label>
                <Form.Control
                name = 'price'
                value = {price} 
                onChange={onChangeHandler}
                placeholder="가격을 적어주세요" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>수량</Form.Label>
                <Form.Control
                name = 'quantity'
                value = {quantity} 
                onChange={onChangeHandler}
                placeholder="수량을 적어주세요" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>상품 설명</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={5}
                onChange={onChangeHandler}
                name = 'description'
                value = {description}
                />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>상품 이미지 등록</Form.Label>
             {/* <Button onClick={onClickGetImage}>이미지 가져오기 </Button> */}
            <ImageUploading
                multiple
                value={images}
                onChange={onChangeImage}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={onError}			// 추가
                >
                {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <Button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        onImageUpload()}}
                    {...dragProps}
                    >
                    사진추가
                    </Button>
                    <br/>
                    &nbsp;
                    {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image['data_url']} alt="" width="700" />
                        <div className="image-item__btn-wrapper">
                        <br/>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            onImageUpdate(index)}}>수정</Button>{' '}
                        <Button onClick={(e) => {
                            e.preventDefault()
                            onImageRemove(index)}}>삭제</Button>
                        </div>
                        <br/>
                    </div>
                    ))}
                </div>
            
                )}
            </ImageUploading>



            </Form.Group>
            <Button type="submit" onClick={onClickHandler}>상품 등록</Button>
            </Form>

            
                </Col>
                
            </Row>
            
        </Container>
        
            
    </div>

    );

}

export default ProductRegister;