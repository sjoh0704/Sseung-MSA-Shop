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
    return(<div style={{marginTop:50, marginBottom:50, fontSize:'1.4rem'}}>
   
    <span>
        <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
        {expression}
        </Link>
        
        </span>
        <span style={{fontWeight:'bolder', color: '#e85255'}}>
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
            <Nav.Item>
            <Nav.Link href={path} style={{color:'white'}}>{k.kind}</Nav.Link>
            </Nav.Item>
            
        );
    }
    );

    
    

    return(

            <div style={{background:"#e85255", fontSize: "1.3rem", paddingTop:5, paddingBottom:5, color:'white'}}>

                <Nav style={{fontWeight:'bold'}} justify className="justify-content-center" variant="pills" defaultActiveKey="/home">
                <Container>
                    <Row>
                <Nav.Item>
                <Nav.Link href="/" style={{color:'white'}}>홈</Nav.Link>
                </Nav.Item>
                    
                {display_category}
        
                {/* <Nav.Item>
                    <Nav.Link href="/product/register" style={{color:'white'}}>판매하기</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/mysales" style={{color:'white'}}>내 상품 목록</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/orderlist" style={{color:'white'}}>주문 목록</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/purchaselist" style={{color:'white'}}>구매 목록</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/likes" style={{color:'white'}}>찜 목록</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/profile" style={{color:'white'}}>내정보</Nav.Link>
                </Nav.Item> */}

                    </Row>
                </Container>
               
                </Nav>

                

          </div>
  
      
        
   );
}

export default CategoryBanner