import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export const LayoutFormEdit = () => {

    //import the needed for this form    
    const { updateLayout, getLayoutsByUser, getLayoutsById } = useContext(LayoutContext);
    const { currentUserId } = useContext(UserProfileContext);
    const history = useHistory();
    const { id } = useParams();

    //the properties on the layout
    const [idLayout, setIdLayout] = useState(0);
    const [type, setType] = useState('');
    const [timeEstimate, setTimeEstimate] = useState(0);
    const [description, setDescription] = useState('');

    //for editing the layout 
    //check for the correct id 
    useEffect(() => {
        getLayoutsById(id)
            .then((currentLayout) => {
                setIdLayout(currentLayout.id);
                setType(currentLayout.type);
                setDescription(currentLayout.description);
                setTimeEstimate(currentLayout.timeEstimate);
            })
    }, [])

    //clears the state in the edit form 
    const clearState = () => {
        setType("");
        setTimeEstimate(0);
        setDescription("");
    }

    //handle click edit function
    const handleClickEdit = (evt) => {
        const layout = {
            id: idLayout,
            type,
            timeEstimate,
            description
        }
        updateLayout(layout)
            .then(clearState)
            .then(() => {
                history.push(`/monthlyLayoutCreate`)
            })
    }

    //exit the edit form without making changes
    const handleCancel = () => {
        history.push(`/monthlyLayout/${currentUserId}`)
    };

    //this form differs from the add form by the edit and cancel buttons
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
                        Edit
                    </Button>
                    :
                    <Button active
                        color="primary"
                        className="ml-4 mt-2 btn-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickEdit}
                    >
                        Edit
                    </Button>
            }
            <Button
                className=" ml-4 mt-2 btn-primary"
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </Form>
    )
}
export default LayoutFormEdit;