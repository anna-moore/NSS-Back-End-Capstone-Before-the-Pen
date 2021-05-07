import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const TypeOfMediaContext = createContext();

export function TypeOfMediaProvider(props) {
    const apiURL = 'api/typeOfMedia';

    const userProfile = sessionStorage.getItem('userProfile');
    const [currentUserId, setCurrentUserId] = useState(0);
    const { getToken } = useContext(UserProfileContext);
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [typeOfMedia, setTypeOfMedia] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            setCurrentUserId(JSON.parse(userProfile).id);
        }
    }, [userProfile]);

    //gather all of the types of media 
    const getAllTypeofMedia = () => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setTypeOfMedia);
    }

    return (
        <TypeOfMediaContext.Provider
            value={{
                getAllTypeofMedia,
                setTypeOfMedia,
                typeOfMedia
            }}
        >
            {props.children}
        </TypeOfMediaContext.Provider>
    )
}