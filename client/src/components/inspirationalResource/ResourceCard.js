import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import YoutubeEmbed from '../homepage/SpotlightVideo';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const ResourceCard = ({ resource }) => {
    const { getInspoResourceByUser, deleteInspoResource } = useContext(InspoResourceContext);
    const { currentUserId } = useContext(UserProfileContext);
    const history = useHistory();
    const { id } = useParams();

    //handle delete of resource
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this layout?')) {
            deleteInspoResource(resource.id).then(() => getInspoResourceByUser(id));
            history.push(`/inspirationalResources/${currentUserId}`);
        }
    };

    //brings up the edit form :) 
    const handleEdit = () => {
        history.push(`/inspirationalResources/edit/${resource.id}`)
    }

    return (
        <Card className="m-3">
            <CardBody style={{ width: "40em" }}>
                {/* //this is where the name of the resource will be added 
                //make this name a link */}
                <CardTitle className="ml-3" tag="h4"><strong><a href={resource.url}>{resource.name}</a></strong>
                    <i
                        className="fas fa-trash-alt float-right pl-2"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer' }}
                    ></i>
                    <i
                        className="fas fa-edit float-right "
                        onClick={handleEdit}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </CardTitle>
                {resource.imageURL !== undefined ?
                    <div className="text-center mb-3">
                        <img
                            src={resource.imageURL}
                            style={{ maxWidth: '800px', maxHeight: '350px' }}
                            className="rounded mx-auto d-block img-fluid"
                        // alt=""
                        />
                    </div>
                    :
                    ("no image to provided.")
                }

                {/* typeOfMediaId on the backend is Youtube */}
                {resource.typeOfMediaId === 1 ?
                    (<div className="App">
                        <YoutubeEmbed embedId={resource.url} />
                    </div>)
                    :
                    ("")
                }

                {resource.description !== undefined ?
                    (<CardText style={{ whiteSpace: 'pre-line' }} className="mx-4 pt-2">   {resource.description}  </CardText>)
                    :
                    ("")
                }


                <CardText className="mr-4 float-right">
                    {resource.typeOfMedia.type}
                </CardText>
            </CardBody>
        </Card>
    );

}
export default ResourceCard;