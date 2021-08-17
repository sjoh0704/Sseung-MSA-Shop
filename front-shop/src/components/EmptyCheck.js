import React from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import EmptyBox from '../images/box.png'
import MakeCard from './MakeCard';
const EmptyCheck =({text, items}) => {

    if(items.length == 0){
        return(<Row>
                <Col>
                    <p style={{fontSize:'2rem',marginLeft: 200, marginTop:50}}>{text}</p>
                    <img style={{ margin:100}}src={EmptyBox}></img>
                </Col>
            </Row>);
    }
    else{
        return(  <ListGroup>
                    {items}
            </ListGroup>);
    }

}

export function EmptyCheckProductByCategory({text, items}){

    if(items.length == 0){
        return(<Row>
                <Col>
                    <p style={{fontSize:'2rem',marginLeft: 200, marginTop:50}}>{text}</p>
                    <img style={{ margin:100}}src={EmptyBox}></img>
                </Col>
            </Row>);
    }
    else{
        return(  
            <MakeCard products={items}></MakeCard>
        );

    }
}

export default EmptyCheck;