import {Row, Col, Card} from 'react-bootstrap'
const DisplayProducts = ({products}) =>{
    products = products.map((product, index) => {
        return (
            
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
                )
    })
    return (
        <Row>
        {products}
        </Row>
    )
};

export default DisplayProducts
