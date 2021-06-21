import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import ResourceCard from './ResourceCard';


const ResourceList = ({ }) => {
    const { inspoResource, getInspoResourceByUser } = useContext(InspoResourceContext);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (id) {
            getInspoResourceByUser(id);
        }
    }, [id])

    const handleClickNewResource = () => {
        history.push(`/inspirationalResources/create`)
    }

    return (
        <div className="container mt-5">
            <Label className="text-center  " tag="h2" ><strong>List of Your Creative Ideas</strong>
                <i className="fas fa-plus-circle ml-4 2x"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickNewResource}
                ></i>
            </Label>

            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        inspoResource.length > 0 ?
                            (inspoResource.map((resource) => {
                                return <ResourceCard key={resource.id} resource={resource} />
                            })
                            ) : (
                                <span style={{ marginTop: "30px" }}>No resources for this user yet.</span>
                            )
                    }
                </div>
            </div>
        </div>
    );
};
export default ResourceList;