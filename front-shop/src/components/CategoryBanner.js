import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Dropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function CategoryBanner(){
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    const display_category = kind.map((k, index) =>{

        let  path = '/category/' + (index + 1)
        return (
            <Dropdown.Item key={index}><Link to={path}>{k.kind}</Link></Dropdown.Item>
        );
    }
    );
    

    return(
        <div style={{background:'primary'}}> 
            <Container>
        <Dropdown>
            <Dropdown.Toggle variant='light' id="dropdown-basic">
                Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {display_category}
            </Dropdown.Menu>
        </Dropdown>
        </Container>
        </div>
      
        
   );
}

export default CategoryBanner