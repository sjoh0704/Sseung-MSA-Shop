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
        <Col lg = {{ span: 3, offset: 0}}
            sm = {{ span: 3, offset: 0}}
        >
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
        <Col lg={{span: 8, offset: 1}}
            sm={{span: 9, offset: 0}}
         style={{paddingTop: 70}}>
        <Form>
  <Row className="align-items-center">
    <Col lg={{span: 9}}
    sm={{span: 9, offset: 0}}>
      <Form.Control 
      size='lg'
      id="inlineFormInputName" 
      placeholder="검색어를 입력하세요" />
    </Col>
    <Col lg={{span: 3}}
    sm={{span: 3}}
    >
      <button className='emptyButton' style={{width: 100, height: 50, fontSize:'1.3rem'}}>Search</button>
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