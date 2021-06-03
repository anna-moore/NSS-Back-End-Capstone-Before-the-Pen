import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
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


    //add a create new resource button at the top
    return (
        <div className="container mt-5">
            <Button
                style={{ cursor: 'pointer' }}
                className="mr-3 btn-primary"
                onClick={handleClickNewResource}
                className="float-right"
            >
                Create New
            </Button>
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