import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const MonthlyLayoutContext = createContext();

export function MonthlyLayoutProvider(props) {
    const apiURL = '/api/monthlyLayout';

    const userProfile = sessionStorage.getItem('userProfile');
    const { getToken } = useContext(UserProfileContext);
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [monthlyLayout, setMonthlyLayout] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            setCurrentUserId(JSON.parse(userProfile).id);
        }
    }, [userProfile]);



    //gathers the monthly layouts
    const getMonthlyLayoutsByUser = (id) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/GetMonthlyLayoutsByUser/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setMonthlyLayout);
    };

    //get monthly layout by id only 
    //
    const getMonthlyLayoutsById = (monthlyId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/${monthlyId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(setMonthlyLayout)
            );
    };

    //add a monthly layout
    const addMonthlyLayout = (monthlyLayout) => {
        return getToken().then((token) =>
            fetch(`${apiURL}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(monthlyLayout),
            })
        );
    };

    //***This is the provider function to combine both monthly and monthlyLayout forms **//
    const addMonthlyAndLayout = (monthly, monthlyLayout) => {
        return getToken.then((token) =>
            fetch(`${apiURL}/AddMonthlyAndLayouts`, {
                method: 'POST',
                header: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ monthly, monthlyLayout }),
            })
        );
    };


    //how do I make sure that security on editing the post works??
    //edit the monthly layout
    const updateMonthlyLayout = (monthlyLayout) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${monthlyLayout.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(monthlyLayout),
            })
        );
    };

    //delete the monthly layout
    const deleteMonthlyLayout = (monthlyLayoutId) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${monthlyLayoutId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <MonthlyLayoutContext.Provider
            value={{
                getMonthlyLayoutsByUser,
                getMonthlyLayoutsById,
                addMonthlyLayout,
                updateMonthlyLayout,
                deleteMonthlyLayout,
                setMonthlyLayout,
                monthlyLayout,

            }}
        >
            {props.children}
        </MonthlyLayoutContext.Provider>
    );
};