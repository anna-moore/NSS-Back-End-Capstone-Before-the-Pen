import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import MonthlyLayoutView from './MonthlyLayoutView';

const MonthlyLayoutList = () => {
    const { monthly, getMonthlyByUser } = useContext(MonthlyContext)
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getMonthlyByUser(currentUserId)
    }, [])

    //add a create button for creating new monthly layout 
    //map over all of the monthly records/ objects in the array
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        monthly.length > 0 ?
                            (monthly.map((m) => {
                                return <MonthlyLayoutView key={m.id} monthly={m} />;
                            }))
                            : (<span style={{ marginTop: "30px" }}>No layouts for this month.</span>)
                    }
                </div>
            </div>
        </div>
    );
};
export default MonthlyLayoutList;
