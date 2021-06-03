import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const TypeOfMediaContext = createContext();

export function TypeOfMediaProvider(props) {
    const apiURL = '/api/typeOfMedia';

    const { getToken } = useContext(UserProfileContext);
    const [typeOfMedia, setTypeOfMedia] = useState([]);

    //gather all of the types of media 
    const getAllTypeOfMedia = () => {
        return getToken()
            .then((token) =>
                fetch(apiURL, {
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
                getAllTypeOfMedia,
                setTypeOfMedia,
                typeOfMedia
            }}
        >
            {props.children}
        </TypeOfMediaContext.Provider>
    )
}