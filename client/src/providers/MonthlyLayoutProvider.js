import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const MonthlyLayoutContext = createContext();

export function MonthlyLayoutProvider(props) {
    const apiURL = '/api/monthlyLayout';

    const { getToken } = useContext(UserProfileContext);
    const [monthlyLayout, setMonthlyLayout] = useState([]);

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

    //get monthly layout by monthly id  
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
            );
    };



    //***This is the provider function to combine both monthly and monthlyLayout forms **//
    const addMonthlyAndLayout = (monthly, monthlyLayouts) => {
        return getToken()
            .then((token) =>
                fetch('/api/monthly', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ monthly, monthlyLayouts }),
                })
            );
    };


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
                // addMonthlyLayout,
                addMonthlyAndLayout,
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




    //add a monthly layout
    // const addMonthlyLayout = (monthlyLayout) => {
    //     return getToken().then((token) =>
    //         fetch(`${apiURL}`, {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(monthlyLayout),
    //         })
    //     );
    // };