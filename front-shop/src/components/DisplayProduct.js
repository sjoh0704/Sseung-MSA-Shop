import {Row, Col, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// id가 필요하다!!
const DisplayProducts = ({products}) =>{
    products = products.map((product, index) => {
        let path = '/product/' + product.id
        return (
                <Link to={path}>
                <Col xs key={index}>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                        {product.price}원
                        </Card.Text>
                    
                    </Card.Body>
                    </Card>
                </Col>
                </Link>
                
                )
    })
    return (
        <Row>
        {products}
        </Row>
    )
};

export default DisplayProducts
