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
        history.push(`/inspirationalResources/${id}`)
    }

    return (
        <Card className="m-4">
            <CardBody style={{ width: "35em" }}>
                <CardTitle tag="h5"><strong>{resource.imageURL}</strong>
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
                {resource.imgageURL != "" ?
                    (<img scr={resource.imageURL} alt="info about the pictures" />)
                    :
                    ("no image to provided.")
                }
                {/* this needs to be updated for exact the embed code from the URL */}
                {resource.typeOfMediaId == 1 ?
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
                    {resource.url}
                </CardText>
            </CardBody>
        </Card>
    );

}
export default ResourceCard;