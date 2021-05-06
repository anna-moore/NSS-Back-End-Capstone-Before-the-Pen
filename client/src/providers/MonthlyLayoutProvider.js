import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const MonthlyLayoutContext = createContext();

export function MonthlyLayoutProvider(props) {
    const apiURL = '/api/monthlyLayout';
    const { getToken } = useContext(UserProfileContext);

    return (
        <MonthlyLayoutContext.Provider
            values={{}}
        >
            {props.children}
        </MonthlyLayoutContext.Provider>
    );
};