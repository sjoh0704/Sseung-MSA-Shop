import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Navbar, Nav, NavDropdown, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function CategoryBanner(){
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    console.log(kind)
    const display_category = kind.map((k, index) => {
        
        let  path = '/category/' + (index + 1)
        return (
            <NavDropdown.Item key={index}><Link to={path} style={{textDecoration:'none', color:'inherit'}}>{k.kind}</Link></NavDropdown.Item>
           
        );
    }
    );
    

    return(

            <div>

          
                    
                    <Container>
                        <Row>
                            <Col xs lg={3}>
                            <NavDropdown title="Category" id="navbarScrollingDropdown">
                            {display_category}
                            </NavDropdown>
                            </Col>

                            <Col>
                            <Nav className="mr-auto">
            
                            <Nav.Link ><Link to="/register"style={{textDecoration:'none', color:'inherit'}}>판매하기</Link></Nav.Link>
                            <Nav.Link ><Link to="/orderlist"style={{textDecoration:'none', color:'inherit'}}>구매목록</Link></Nav.Link>
                            <Nav.Link ><Link to="/register"style={{textDecoration:'none', color:'inherit'}}>장바구니</Link></Nav.Link>
                        
                            </Nav>
                            </Col>

                            
                        </Row>
      
        </Container>
            
          </div>
  
      
        
   );
}

export default CategoryBanner