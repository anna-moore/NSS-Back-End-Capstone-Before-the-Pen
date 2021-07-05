import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export const LayoutFormAdd = () => {

    //import the needed this form    
    const { addLayout } = useContext(LayoutContext);
    const { currentUserId } = useContext(UserProfileContext);

    const history = useHistory();

    //the properties on the layout
    const [type, setType] = useState('');
    const [timeEstimate, setTimeEstimate] = useState(0);
    const [description, setDescription] = useState('');


    const handleClickSave = (evt) => {
        const layout = {
            type,
            timeEstimate,
            description
        }
        addLayout(layout).then(() => {
            history.push(`/layout/${currentUserId}`)
        })
    }

    return (
        <Form className="container col-md-4">
            <Label className="text-center pb-4" for="LayoutForm" tag="h2"> <strong>Add New Layout Type</strong></Label>
            <FormGroup>
                <Label className="font-weight-bold" for="type">Name of Layout</Label>
                <Input
                    style={{ width: '85%' }}
                    type="text"
                    name="type"
                    id="type"
                    placeholder="i.e. Sleep Tracker"
                    autoComplete="off"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    value={type}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label className="font-weight-bold" for="timeEstimate">Time Estimate in Minutes</Label>
                <Input
                    style={{ width: '85%' }}
                    type="text"
                    name="timeEstimate"
                    id="timeEstimate"
                    placeholder="i.e.30"
                    autoComplete="off"
                    onChange={(e) => {
                        setTimeEstimate(e.target.value);
                    }}
                    value={timeEstimate}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label className="font-weight-bold" for='description'>Description</Label>
                <Input
                    style={{ width: '85%' }}
                    type="textarea"
                    name="description"
                    id="description"
                    rows="6"
                    wrap="hard"
                    placeholder="this layout tracks sleep and wake hours"
                    autoComplete="off"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    value={description}
                    required
                />
            </FormGroup>
            {
                type.replace(/ /g, '').length === 0 ?
                    <Button disabled
                        className=" ml-4 mt-2 btn-primary"
                        style={{ cursor: 'pointer' }}
                    >
                        Save
                    </Button>
                    :
                    <Button active
                        color="primary"
                        className="ml-4 mt-2 btn-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickSave}
                    >
                        Save
                    </Button>
            }
        </Form>
    )
}
export default LayoutFormAdd;