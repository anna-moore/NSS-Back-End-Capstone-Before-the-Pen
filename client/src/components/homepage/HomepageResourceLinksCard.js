import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Category = ({ link }) => {

    //this sections need the text to be the topic and the topic is set to the be a link 
    return (
        <Card className="m-4">
            <CardBody>
                <div >
                    <a href={link.url}>{link.topic}</a>
                    {' '}
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;