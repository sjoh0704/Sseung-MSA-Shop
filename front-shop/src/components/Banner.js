import React from 'react'
import {Container,Row, Col, Nav, Navbar, Form, FormControl, Button, InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import bucket from '../images/bucket.png'
const Banner = () => {
    return(
      <div style={{paddingBottom: 30}}>
  <hr/>
  
  <Container>
      <Row>
        <Col xs lg = {3}>
        <Navbar.Brand href="#home">
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
          <img src={bucket} style={{width:70}}>
          </img>
          <h2 style={{color: 'black'}}>
            My Shopping Mall
            </h2>
            </Link>
            
            </Navbar.Brand>
        </Col>
        <Col xs lg={8} style={{paddingTop: 70}}>
        <Form>
  <Row className="align-items-center">
    <Col lg={9} className="my-1">
      <Form.Control id="inlineFormInputName" placeholder="검색어를 입력하세요" />
    </Col>
    <Col lg={3} className="my-1">
      <Button variant="outline-light" style={{background: '#e85255', fontSize:'1.3rem'}}>Search</Button>
    </Col>
  </Row>
</Form>
        
        </Col>

        
      </Row>
      </Container>
    
   
</div>


        
     
    )
}

export default Banner;