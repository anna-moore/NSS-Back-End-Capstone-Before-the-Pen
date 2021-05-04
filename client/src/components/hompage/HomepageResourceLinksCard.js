import React, { useContext } from 'react';
import { Card, CardBody } from 'reactstrap';

const Category = ({ link }) => {

    //this sections need the text to be the topic and the topic is set to the be a link 
    return (
        <Card className="m-4">
            <CardBody>
                {/* <strong>{Links.name}</strong> */}
                <div className="float-right">
                    <a href={link.URL}>{link.name}</a>
                    {' '}
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;