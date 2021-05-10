import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import YoutubeEmbed from '../homepage/SpotlightVideo';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';

export const ResourceCard = ({ resource }) => {
    const { getInspoResourceByUser, deleteInspoResource } = useContext(InspoResourceContext);
    const history = useHistory();
    const { id } = useParams();
    console.log(resource);
    //handle delete of resource
    //update the push statement
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this layout?')) {
            deleteInspoResource(resource.id).then(() => getInspoResourceByUser(id));
            history.push(`/homepage`);
        }
    };

    //brings up the edit form :) 
    const handleEdit = () => {
        history.push(`/inspirationalResources/edit/${id}`)
    }

    return (
        <Card className="m-4">
            <CardBody style={{ width: "35em" }}>
                <CardTitle tag="h5"><strong>{resource.url}</strong>
                    <i
                        className="fas fa-trash-alt float-right"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer' }}
                    ></i>
                    <i
                        className="fas fa-edit float-right "
                        onClick={handleEdit}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </CardTitle>
                {/* {resource.imgageURL !== "" ?
                    (<img scr={resource.imageURL} alt="info about the pictures" />)
                    :
                    ("no image to provided.")
                } */}

                <div className="text-center">
                    <img
                        src={resource.imageURL}
                        style={{ maxWidth: '800px', maxHeight: '350px' }}
                        className="rounded mx-auto d-block img-fluid"
                    // alt="random picture probably not relating to the post"
                    />
                </div>
                {/* this needs to be updated for exact the embed code from the URL */}
                {resource.typeOfMediaId === 1 ?
                    (<div className="App">
                        <YoutubeEmbed embedId={resource.url} />
                    </div>)
                    :
                    ("")
                }
                <CardText>
                    {resource.description}
                </CardText>
                <CardText>
                    {resource.typeOfMedia.type}
                </CardText>
            </CardBody>
        </Card>
    );

}
export default ResourceCard;