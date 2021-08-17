import react from 'react'
import DisplayProducts from './MakeCard'
import {Container, Spinner, Row, Col} from 'react-bootstrap'
const Loading = ({products}) =>{
    if(products.length==0)
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <Spinner style={{marginTop: 100,marginBottom:100, width:50, height:50}}animation="border" variant="primary">
                        </Spinner>      
                    </Col>
                </Row>
            </Container>
                
    )
    return(
        <div>
        <div style={{marginTop:30}}/>           
        <DisplayProducts products={products}/>
        </div>
    )

}

export default Loading