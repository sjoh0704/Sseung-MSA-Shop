import React from 'react'
import {Container,Row, Col, Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import CategoryBanner from './CategoryBanner'
const Banner = () => {
    return(
  
  <>
  <hr/>
  <br />
<div>
<Container>
      <Row>
        <Col md = {4}>
        <Navbar.Brand href="#home">
          <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
          <h2>
            Shopping Mall
            </h2>
            </Link>
            
            </Navbar.Brand>
        </Col>
        <Col md={{ span: 4}}>
        <Form>
      <FormControl type="text" placeholder="Search" className=" mr-sm-2"/>
      </Form>
      
   
        </Col>

        <Col md={{ span: 4}}>
        <Button variant="outline-primary">Search</Button>
        </Col>

        
      </Row>
      </Container>
    
   
</div>


</>

        
     
    )
}

export default Banner;