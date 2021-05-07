import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const MonthlyLayoutContext = createContext();

export function MonthlyLayoutProvider(props) {
    const apiURL = '/api/monthlyLayout';
}