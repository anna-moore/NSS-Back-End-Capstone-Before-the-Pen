import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider'
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export const LayoutFormAdd = () => {

    //import the needed this form 


    //the properties on the layout

    useEffect(() => {

    }, []);


    const handleClickSave = (evt) => {

    }

    return (
        <Form className="container col-md-10">
            <Label className="text-center pb-4" for="LayoutForm" tag="h2"> <strong>Add New Layout Type</strong></Label>
            <FormGroup>

            </FormGroup>
        </Form>
    )
}
export default LayoutFormAdd;