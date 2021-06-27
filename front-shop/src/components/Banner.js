import React from 'react'
import {Container, Row, Col, Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
const Banner = () => {
    return(
        
        // <Container>
        //     <h1>Shopping shop</h1>
        // </Container>
        <>
  
  <br />
  <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href="#home">ShoppingMall</Navbar.Brand>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    <Nav className="mr-auto">
      <Nav.Link href="#home">판매하기</Nav.Link>
      <Nav.Link href="#features">내 상점</Nav.Link>
      <Nav.Link href="#pricing">장바구니</Nav.Link>
    </Nav>
      </Container>
   
    
  </Navbar>

</>

        
     
    )
}

export default Banner;