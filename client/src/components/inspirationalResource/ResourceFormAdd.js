import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';

//how to make the require fields required? 
export const ResourceFormAdd = () => {
    const { inspoResource, addInspoResource } = useContext(InspoResourceContext);
    const { typeOfMedia, getAllTypeOfMedia } = useContext(TypeOfMediaContext)
    //const [resource, setResource] = useState({});
    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a resource
    // set userProfileId in the Controller
    const [typeOfMediaId, setTypeOfMediaId] = useState(1);
    const [url, setURL] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        getAllTypeOfMedia();
    }, [])

    //handle click save function 
    const handleClickSave = (evt) => {
        const resource = {
            typeOfMediaId,
            url,
            imageURL,
            description
        }
        addInspoResource(resource).then(() => {
            history.push('/inspirationalResources');
        })
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
                <Label htmlFor="typeOfMediaId">Type of Media </Label>
                <Input
                    type="select"
                    name="typeOfMediaId"
                    id="typeOfMediaId"
                    value={typeOfMediaId}
                    onChange={(e) => {
                        setTypeOfMediaId(e.target.value);
                    }}
                >
                    <option value="1">Type of Media</option>
                    {typeOfMedia.map(t => {
                        return (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        );
                    })}
                </Input>
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
                    type="textarea"
                    name="description"
                    id="description"
                    rows="10"
                    wrap="hard"
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