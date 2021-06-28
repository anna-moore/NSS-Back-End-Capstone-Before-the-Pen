import React, { useState, useEffect, createContext, useContext } from 'react';
// import * as firebase from 'firebase/app';
import 'firebase/auth';
import { UserProfileContext } from './UserProfileProvider';

export const HomepageContext = createContext();

export function HomepageProvider(props) {
    const apiURL = '/api/homepage';

    const { getToken } = useContext(UserProfileContext)
    const [currentUserId, setCurrentUserId] = useState(0);
    const [homepageResourceLinks, setHomepageResourceLinks] = useState([]);
    const [spotlight, setSpotlight] = useState("");

    //gathers the single spotlight object 
    const getSpotlight = () => {
        return getToken().then((token) =>
            fetch(`${apiURL}/currentSpotlight`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((resp) => resp.json())
                .then(setSpotlight)
        );
    };

    //gathers the list of links for the homepage
    const getResourceLinks = () => {
        return getToken().then((token) => {
            fetch(`${apiURL}/helpfulLinks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then(setHomepageResourceLinks)
        });
    };


    return (
        <HomepageContext.Provider
            value={{
                getResourceLinks,
                getSpotlight,
                setSpotlight,
                setHomepageResourceLinks,
                spotlight,
                homepageResourceLinks
            }}
        >
            {props.children}
        </HomepageContext.Provider>
    );
};