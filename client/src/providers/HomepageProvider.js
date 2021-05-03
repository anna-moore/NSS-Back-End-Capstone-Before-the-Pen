import React, { useState, useEffect, createContext } from 'react';
import { Spinner } from 'reactstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const HomepageContext = createContext();

export function HomepageProvider(props) {
    const apiURL = '/api/homepage';

    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const userProfile = sessionStorage.getItem('userProfile');
    const [homepageResourceLinks, setHomepageResourceLinks] = useState("");
    const [spotlight, setSpotlight] = useState("")

    useEffect(() => {
        if (isLoggedIn) {
            setCurrentUserId(JSON.parse(userProfile).id);
        }
    }, [userProfile]);

    //gathers the single spotlight object 
    const GetSpotlight = () => {
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
                GetSpotlight,
                setSpotlight,
                setHomepageResourceLinks,
                spotlight,
                homepageResourceLinks
            }}
        ></HomepageContext.Provider>
    );
};