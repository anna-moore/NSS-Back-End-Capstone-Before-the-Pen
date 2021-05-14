import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


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
    const [name, setName] = useState('');

    //for editing inspo resources
    useEffect(() => {
        getInspoResourceById(id)
            .then((currentInspoResource) => {
                setIdResource(currentInspoResource.id)
                setURL(currentInspoResource.url);
                setImageURL(currentInspoResource.imageURL);
                setTypeOfMediaId(currentInspoResource.typeOfMediaId);
                setDescription(currentInspoResource.description);
                setName(currentInspoResource.name);
            })
            .then(() => getAllTypeOfMedia())
    }, [])

    //clear the state in the edit form 
    const clearState = () => {
        setTypeOfMediaId(0); //this is not stuck in the form like the others
        setURL('');
        setImageURL('');
        setDescription('');
        setName('')
    }

    //handle click save function 
    const handleClickEdit = (evt) => {
        const resource = {
            id: idResource,
            typeOfMediaId,
            url,
            imageURL,
            description,
            name
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
        <Form className="container col-md-8">
            <Label className="text-center pb-2" tag="h2">Update Your Creative Ideas </Label>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    style={{ width: '65%' }}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="i.e. Bee Themed"
                    autoComplete="off"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="typeOfMediaId">Type of Media </Label>
                <Input
                    style={{ width: '65%' }}
                    type="select"
                    name="typeOfMediaId"
                    id="typeOfMediaId"
                    value={typeOfMediaId}
                    onChange={(e) => {
                        setTypeOfMediaId(e.target.value);
                    }}
                    required
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
                <Label for="url">Website URL</Label>
                <Input
                    style={{ width: '65%' }}
                    type="text"
                    name="url"
                    id="url"
                    placeholder="www... "
                    autoComplete="off"
                    onChange={(e) => {
                        setURL(e.target.value);
                    }}
                    value={url}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="imageURL">Image URL</Label>
                <Input
                    style={{ width: '65%' }}
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
                    style={{ width: '65%' }}
                    type="textarea"
                    rows="8"
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
                    className=" ml-4 mt-2 btn-primary"
                    style={{ cursor: 'pointer' }}
                >
                    Edit
                    </Button>
                :
                <Button active
                    className=" ml-4 mt-2 btn-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickEdit}>
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
export default ResourceFormEdit;