import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Navbar, Nav, NavDropdown, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function CategoryBanner(){

    const{isLoggedIn} = useSelector(state=>({
        isLoggedIn: state.user.isLoggedIn
    }))

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

    const Item = ({path, pathname})=> {
        if(!isLoggedIn){
            return (<Nav.Link ><Link onClick={()=>{alert("로그인 후 이용해주세요^^")}}to="/" style={{textDecoration:'none', color:'inherit'}}>{pathname}</Link></Nav.Link>)
        }
        return (<Nav.Link ><Link to={path}style={{textDecoration:'none', color:'inherit'}}>{pathname}</Link></Nav.Link>)
    }
    

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
                            <Item path={"/product/register"} pathname={'판매하기'}/>
                            <Item path={"/orderlist"} pathname={'구매목록'}/>
                            <Item path={"/register"} pathname={'장바구니'}/>
                            <Item path={"/profile"} pathname={'내정보'}/>
                        
                            </Nav>
                            </Col>

                            
                        </Row>
      
        </Container>
            
          </div>
  
      
        
   );
}

export default CategoryBanner