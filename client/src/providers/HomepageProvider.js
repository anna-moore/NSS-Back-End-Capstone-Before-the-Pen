import React, { useState, useEffect, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const HomepageContext = createContext();

export function HomepageProvider(props) {
    const apiURL = '/api/homepage';

    // const userProfile = sessionStorage.getItem('userProfile');
    // const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [homepageResourceLinks, setHomepageResourceLinks] = useState("");
    const [spotlight, setSpotlight] = useState("")

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setCurrentUserId(JSON.parse(userProfile).id);
    //     }
    // }, [userProfile]);

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
                },
            })
                .then((resp) => resp.json())
                .then(setHomepageResourceLinks)
        });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    return (
        <HomepageContext.Provider
            value={{
                getResourceLinks,
                getSpotlight,
                setSpotlight,
                setHomepageResourceLinks,
                spotlight,
                homepageResourceLinks,
                currentUserId
            }}
        >
            {props.children}
        </HomepageContext.Provider>
    );
};