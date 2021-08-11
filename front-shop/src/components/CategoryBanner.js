import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Navbar, Nav, NavDropdown, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export function CategoryDirection({tag1, tag2, tag3, tag4, tag5}){
    let expression = '홈'

    if(tag1) expression += ` > ${tag1}`;
    if(tag2) expression += ` > ${tag2}`;
    if(tag3) expression += ` > ${tag3}`;
    if(tag4) expression += ` > ${tag4}`;
    if(tag5) expression += ` > ${tag5}`;
    let tags = expression.split(' > ')
    let last = tags[tags.length-1]
    expression = expression.substring(0, expression.length-last.length)
    // console.log(expression)
    return(<div style={{marginTop:100, marginBottom:30, fontSize:'1.4rem'}}>
   
    <span>
        <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
        {expression}
        </Link>
        
        </span>
        <span style={{fontWeight:'bolder'}}>
        {last}
        </span>
     
        </div>
    );
}


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
            <NavDropdown.Item key={index}><Link to={path} style={{fontSize:20, textDecoration:'none', color:'inherit'}}>{k.kind}</Link></NavDropdown.Item>
           
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
                            <NavDropdown title="Category" id="navbarScrollingDropdown" >
                            {display_category}
                            </NavDropdown>
                            </Col>

                            <Col>
                            <Nav className="mr-auto">
                            <Item path={"/product/register"} pathname={'판매하기'}/>
                            <Item path={"/mysales"} pathname={'내 상품 목록'}/>
                            <Item path={"/orderlist"} pathname={'주문 목록'}/>
                            <Item path={"/purchaselist"} pathname={'구매 목록'}/>
                            <Item path={"/likes"} pathname={'찜 목록'}/>
                            <Item path={"/profile"} pathname={'내정보'}/>
                        
                            </Nav>
                            </Col>

                            
                        </Row>
      
        </Container>
            
          </div>
  
      
        
   );
}

export default CategoryBanner