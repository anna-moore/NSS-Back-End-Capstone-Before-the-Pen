import { findByLabelText } from '@testing-library/dom';
import React, { useContext } from 'react';
import { Card, CardBody } from 'reactstrap';
import { CategoryContext } from '../../providers/CategoryProvider';

const Category = ({ links }) => {
    const { deleteCategory, getAllCategories } = useContext(CategoryContext);


    //this sections need the text to be the topic and the topic is set to the be a link 
    return (
        <Card className="m-4">
            <CardBody>
                <strong>{Links.name}</strong>
                <div className="float-right">

                    {' '}
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;