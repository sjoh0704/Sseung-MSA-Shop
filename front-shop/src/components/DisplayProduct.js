import {Row, Col, Card} from 'react-bootstrap'
import placeholder from '../images/placeholder2.jpg'
import {Link} from 'react-router-dom'
// id가 필요하다!!
const DisplayProducts = ({products}) =>{
    products = products.map((product, index) => {
        let path = '/product/' + product.id
        return (
            <Col md={4} xs={6} key={index}>
                <Link style={{textDecoration:'none', color:'inherit'}} key={index} to={path}>
                
                    <Card style={{ height: '22rem', width:'25rem' }}>
                    <Card.Img variant="top" style={{ height: '15rem', width:'24.7rem'}} src={product.base64_image_url ? product.base64_image_url: placeholder} />
                    <Card.Body style={{marginTop:15}}>
                    
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text style={{fontSize:20, fontWeight:600}}>
                        {product.price}원
                        </Card.Text>
          
                        
                    
                    </Card.Body>
                    </Card>
                
                </Link>
                <br/>
                </Col>
                
                )
    })
    return (
        <Row>
        {products}
        </Row>
    )
};

export default DisplayProducts
