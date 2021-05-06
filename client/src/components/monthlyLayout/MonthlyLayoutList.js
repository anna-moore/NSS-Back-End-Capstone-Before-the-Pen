import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import MonthlyLayoutCard from './MonthlyLayoutCard';

const MonthlyLayoutList = ({ }) => {
    const { monthlyLayout, getMonthlyLayoutsByUser } = useContext(MonthlyLayoutContext)
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getMonthlyLayoutsByUser(id);
        }
    }, [id])

    //add a create button for creating new monthly layout 
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        monthlyLayout.length > 0 ?
                            (monthlyLayout.map((layout) => {
                                return <MonthlyLayoutCard key={layout.id} layout={layout} />
                            })
                            ) : (
                                <span style={{ marginTop: "30px" }}>No layouts for this month.</span>
                            )
                    }
                </div>
            </div>
        </div>
    );

};

export default MonthlyLayoutList;
