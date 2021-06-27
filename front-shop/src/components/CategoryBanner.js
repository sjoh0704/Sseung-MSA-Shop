import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Dropdown} from 'react-bootstrap'
function CategoryBanner(){
    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    console.log("kind")
    console.log(kind)
    const display_category = kind.map(k =>(
     
            <Dropdown.Item href="#/action-1">{k.kind}</Dropdown.Item>
    ));
    

    return(
        <Dropdown>
            <Dropdown.Toggle variant='light' id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {display_category}
            </Dropdown.Menu>
        </Dropdown>
   );
}

export default CategoryBanner