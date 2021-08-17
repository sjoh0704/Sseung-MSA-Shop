import React from 'react'
import {Container,Row, Col, Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Banner = () => {
    return(
      <div style={{paddingBottom: 30}}>
  <hr/>
  <br/>
  
  <Container>
      <Row>
        <Col xs lg = {3}>
        <Navbar.Brand href="#home">
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
          <h2>
            Shopping Mall
            </h2>
            </Link>
            
            </Navbar.Brand>
        </Col>
        <Col xs lg={6}>
        <Form>
      <FormControl type="text" placeholder="Search" className=" mr-sm-2"/>
      </Form>
      
   
        </Col>

        <Col xs lg={3}>
        <Button variant="outline-primary">Search</Button>
        </Col>

        
      </Row>
      </Container>
    
   
</div>


        
     
    )
}

export default Banner;