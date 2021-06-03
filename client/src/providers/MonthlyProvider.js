import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const MonthlyContext = createContext();
export function MonthlyProvider(props) {
    const apiURL = '/api/monthly';

    const userProfile = sessionStorage.getItem('userProfile');
    const { getToken } = useContext(UserProfileContext);

    const [monthly, setMonthly] = useState([]);

    //gathers the monthly by user this is a list
    const getMonthlyByUser = (id) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/GetMonthlyByUser/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((monthly) => {
                console.log(monthly)
                setMonthly(monthly)
                return monthly
            });
    };

    //get monthly  by id only 
    const getMonthlyById = (monthlyId) => {
        return getToken()
            .then((token) =>
                fetch(`${apiURL}/${monthlyId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(setMonthly)
            );
    };

    //edit the monthly 
    const updateMonthly = (monthly) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${monthly.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(monthly),
            })
        );
    };

    //delete the monthly 
    const deleteMonthly = (monthlyId) => {
        return getToken().then((token) =>
            fetch(`${apiURL}/${monthlyId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };

    return (
        <MonthlyContext.Provider
            value={{
                getMonthlyByUser,
                getMonthlyById,
                // addMonthly,
                updateMonthly,
                deleteMonthly,
                setMonthly,
                monthly,
            }}
        >
            {props.children}
        </MonthlyContext.Provider>
    );
};

  //add a monthly 
    // const addMonthly = (monthly) => {
    //     debugger;
    //     return getToken().then((token) =>
    //         fetch(apiURL, {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(monthly),
    //         })
    //     );
    // };