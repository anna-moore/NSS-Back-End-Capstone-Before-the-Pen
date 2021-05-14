import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Category = ({ link }) => {

    //this sections need the text to be the topic and the topic is set to the be a link 
    return (
        // <Card className="m-2 ">
        <CardBody>
            <a href={link.url} className="font-weight-bold">{link.topic}</a>
            {/* {' '} */}
        </CardBody>
        // {/* </Card> */ }
    );
};

export default Category;