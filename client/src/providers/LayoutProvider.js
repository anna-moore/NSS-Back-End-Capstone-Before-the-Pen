import React, { useState, useEffect, createContext, useContext } from 'react';
import { MonthlyLayoutContext } from './MonthlyLayoutProvider';
import { UserProfileContext } from './UserProfileProvider';

export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
    const apiURL = '/api/layout';
    const { getToken } = useContext(UserProfileContext);
    const [layouts, setLayout] = useState([]);


    //gathers the  layouts
    const getLayoutsByUser = (id) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/getLayoutByUser/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then(setLayout);
    };

    //get a single layout by id
    const getLayoutsById = (layoutId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/${layoutId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => {
                        // console.log(res)
                        return res.json()
                    })
                    .then(setLayout)
            );
    };

    //add a  layout
    const addLayout = (Layout) => {
        return getToken().then((token) =>
            fetch(`${apiURL}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Layout),
            })
        );
    };

    //edit the layout
    const updateLayout = (Layout) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${Layout.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Layout),
            })
        );
    };

    //delete the layout
    const deleteLayout = (LayoutId) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${LayoutId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <LayoutContext.Provider
            value={{
                getLayoutsByUser,
                getLayoutsById,
                addLayout,
                updateLayout,
                deleteLayout,
                setLayout,
                layouts,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
};