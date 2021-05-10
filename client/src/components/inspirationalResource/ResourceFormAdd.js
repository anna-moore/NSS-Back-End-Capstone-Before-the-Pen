import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//how to make the require fields required? 
export const ResourceFormAdd = () => {
    const { inspoResource, addInspoResource } = useContext(InspoResourceContext);
    const [resource, setResource] = useState({});
    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a resource
    // set userProfileId in the Controller
    const [typeOfMedia, setTypeOfMedia] = useState(0);
    const [url, setURL] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');



    //handle click save function 
    const handleClickSave = (evt) => {
        const resource = {
            typeOfMedia,
            url,
            imageURL,
            description
        }
        addInspoResource(resource)
        //push to the list page 


    }

    //a return statement with the Form 
    return (
        <Form className="container">
            <FormGroup>
                <Label for="url">Website URL</Label>
                <Input
                    type="text"
                    name="url"
                    id="url"
                    placeholder="www... "
                    autoComplete="off"
                    onChange={(e) => {
                        setURL(e.target.value);
                    }}
                    value={url}
                />
            </FormGroup>
            <FormGroup>
                <Label for="imageURL">Image URL</Label>
                <Input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    placeholder='add image url here'
                    autoComplete="off"
                    onChange={(e) => {
                        setImageURL(e.target.value);
                    }}
                    value={imageURL}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="what is the resource all about?"
                    autoComplete="off"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    value={description}
                />
            </FormGroup>
            {url.replace(/ /g, '').length === 0 ?
                <Button disabled
                    style={{ cursor: 'pointer' }}
                >
                    Save
                    </Button>
                :
                <Button active
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickSave}>
                    Save
                </Button>
            }
        </Form>
    )
}
export default ResourceFormAdd;