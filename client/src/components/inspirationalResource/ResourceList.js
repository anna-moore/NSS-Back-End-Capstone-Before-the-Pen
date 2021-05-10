import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import ResourceCard from './ResourceCard';

const ResourceList = ({ }) => {
    const { inspoResource, getInspoResourceByUser } = useContext(InspoResourceContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getInspoResourceByUser(id);
        }
    }, [id])

    //add a create new resource button at the top
    return (
        <div className="container mt-5">
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