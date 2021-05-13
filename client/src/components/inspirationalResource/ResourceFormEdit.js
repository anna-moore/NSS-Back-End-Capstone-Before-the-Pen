import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//how to make the require fields required? 
export const ResourceFormEdit = () => {
    const { currentInspoResource, getInspoResourceById, updateInspoResource } = useContext(InspoResourceContext);
    const { currentUserId } = useContext(UserProfileContext);
    const { typeOfMedia, getAllTypeOfMedia } = useContext(TypeOfMediaContext)

    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a resource
    const [idResource, setIdResource] = useState(0);
    const [typeOfMediaId, setTypeOfMediaId] = useState(0);
    const [url, setURL] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');

    //for editing inspo resources
    useEffect(() => {
        getInspoResourceById(id)
            .then((currentInspoResource) => {
                setIdResource(currentInspoResource.id)
                setURL(currentInspoResource.url);
                setImageURL(currentInspoResource.imageURL);
                setTypeOfMediaId(currentInspoResource.typeOfMediaId);
                setDescription(currentInspoResource.description);
            })
            .then(() => getAllTypeOfMedia())
    }, [])

    //clear the state in the edit form 
    const clearState = () => {
        setTypeOfMediaId(0); //this is not stuck in the form like the others
        setURL('');
        setImageURL('');
        setDescription('');
    }

    //handle click save function 
    const handleClickEdit = (evt) => {
        const resource = {
            id: idResource,
            typeOfMediaId,
            url,
            imageURL,
            description
        }
        updateInspoResource(resource)
            .then(clearState)
            .then(() => history.push(`/inspirationalResources/${currentUserId}`))
    }

    //exit the edit form without making changes
    const handleCancel = () => {
        history.push(`/inspirationalResources/${currentUserId}`)
    };

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
                    <option value={typeOfMediaId}>Type of Media</option>
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
                    rows="10"
                    wrap="hard"
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
            {currentInspoResource.length === 0 ?
                <Button disabled
                    style={{ cursor: 'pointer' }}
                >
                    Edit
                    </Button>
                :
                <Button active
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickEdit}>
                    Edit
                </Button>
            }
            <Button
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </Form>
    )
}
export default ResourceFormEdit;