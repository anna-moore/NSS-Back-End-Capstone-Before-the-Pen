import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const ResourceFormAdd = () => {
    const { addInspoResource } = useContext(InspoResourceContext);
    const { typeOfMedia, getAllTypeOfMedia } = useContext(TypeOfMediaContext)
    const { currentUserId } = useContext(UserProfileContext);

    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a resource
    const [typeOfMediaId, setTypeOfMediaId] = useState(1);
    const [url, setURL] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');


    useEffect(() => {
        getAllTypeOfMedia();
    }, [])

    //handle click save function 
    const handleClickSave = (evt) => {
        const resource = {
            typeOfMediaId,
            url,
            imageURL,
            description,
            name
        }
        addInspoResource(resource).then(() => {
            history.push(`/inspirationalResources/${currentUserId}`);
        })
    }


    //a return statement with the Form 
    return (
        <Form className="container col-md-8"
        // style={{ display: 'Flex', justifyContent: 'Center', flexDirection: 'column' }}
        >
            <Label className="text-center pb-2" tag="h2">Save Creative Ideas from Around the Web</Label>
            <div >
                <FormGroup>
                    <Label className="font-weight-bold" for="name">Name</Label>
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
                <FormGroup className="">
                    <Label className="font-weight-bold" htmlFor="typeOfMediaId">Type of Media </Label>
                    <Input
                        style={{ width: '65%' }}
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
                    <Label className="font-weight-bold" for="url"> <strong></strong>Website URL</Label>
                    <Input
                        style={{ width: '65%' }}
                        type="text"
                        name="url"
                        id="url"
                        placeholder=" "
                        autoComplete="off"
                        onChange={(e) => {
                            setURL(e.target.value);
                        }}
                        value={url}
                        className="small-input"
                    />
                </FormGroup>

                <FormGroup>
                    <Label className="font-weight-bold" for="imageURL">Image URL</Label>
                    <Input
                        style={{ width: '65%' }}
                        // className="smaller-input"
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
                    <Label className="font-weight-bold" for="description">Description</Label>
                    <Input
                        style={{ width: '65%' }}
                        type="textarea"
                        name="description"
                        id="description"
                        rows="6"
                        wrap="hard"
                        placeholder="what is the resource all about?"
                        autoComplete="off"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                    />
                </FormGroup>
                {
                    url.replace(/ /g, '').length === 0 ?
                        <Button disabled
                            // color="primary" maybe gray before they have typed?
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
                        //style={{ backgroundColor: "#4CAF50" }}
                        >
                            Save
                        </Button>
                }
            </div>
        </Form >
    )
}
export default ResourceFormAdd;