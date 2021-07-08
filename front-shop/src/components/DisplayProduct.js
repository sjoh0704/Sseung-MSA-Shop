import {Row, Col, Card} from 'react-bootstrap'
import placeholder from '../images/placeholder.jpg'
import {Link} from 'react-router-dom'
// id가 필요하다!!
const DisplayProducts = ({products}) =>{
    products = products.map((product, index) => {
        let path = '/product/' + product.id
        return (
            <Col md={4} xs={6} key={index}>
                <Link style={{textDecoration:'none', color:'inherit'}} key={index} to={path}>
                
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={placeholder} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
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
