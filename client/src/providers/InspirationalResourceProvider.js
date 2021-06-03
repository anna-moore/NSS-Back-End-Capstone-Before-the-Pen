import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const InspoResourceContext = createContext();

export function InspoResourceProvider(props) {
    const apiURL = '/api/inspirationalResource';

    const { getToken } = useContext(UserProfileContext);
    const [inspoResource, setInspoResource] = useState([]);
    const [currentInspoResource, setCurrentInspoResource] = useState({});

    //get the resources by user 
    const getInspoResourceByUser = (id) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/GetByUser/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setInspoResource);
    };

    //get resource  by id only 
    const getInspoResourceById = (resourceId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/${resourceId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        console.log(res)
                        return res.json()
                    })
            );
    };

    //add a resource 
    const addInspoResource = (resource) => {
        return getToken().then((token) =>
            fetch(apiURL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resource),
            })
        );
    };

    //edit the resources
    const updateInspoResource = (resource) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${resource.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resource),
            })
        );
    };

    //delete the resource 
    const deleteInspoResource = (resourceId) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${resourceId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <InspoResourceContext.Provider
            value={{
                getInspoResourceByUser,
                getInspoResourceById,
                addInspoResource,
                updateInspoResource,
                deleteInspoResource,
                setInspoResource,
                setCurrentInspoResource,
                currentInspoResource,
                inspoResource,
            }}
        >
            {props.children}
        </InspoResourceContext.Provider>
    );
};