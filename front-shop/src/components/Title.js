import React from 'react'
import {Container} from 'react-bootstrap'
function Title({title}){

    return (
        <Container>
            <br/>
            
            <h2>
                {title}
            </h2>
            <br/>
        </Container>
    )
}

export default Title;