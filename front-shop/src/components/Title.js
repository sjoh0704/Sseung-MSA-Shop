import React from 'react'
import {Container} from 'react-bootstrap'
function Title({title}){

    return (
        <Container>
            <br/>
            <br/>
            <h1>
                {title}
            </h1>
            <hr/>
            <br/>
            <br/>
            
        </Container>
    )
}

export default Title;