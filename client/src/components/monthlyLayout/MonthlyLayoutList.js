import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import MonthlyLayoutCard from './MonthlyLayoutCard';
import MonthlyLayoutView from './MonthlyLayoutView';

const MonthlyLayoutList = () => {
    const { monthlyLayout, getMonthlyLayoutsByUser } = useContext(MonthlyLayoutContext)
    const { monthly, getMonthlyByUser } = useContext(MonthlyContext)
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();
    const [currentMonthly, setCurrentMonthly] = useState([])

    const profileId = JSON.parse(sessionStorage.getItem("userProfile"))

    useEffect(() => {
        //  if (id === profileId.id) {
        getMonthlyByUser(currentUserId)
            //.then(setCurrentMonthly)
            .then(() => console.log(monthly, "this are the monthlys in the list"))

        // }
    }, [])

    //add a create button for creating new monthly layout 
    //map over all of the monthly records/ objects in the array
    //
    console.log(monthly)
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="cards-column" >
                    {
                        monthly.map((m) => {
                            return <MonthlyLayoutView key={m.id} monthly={m} />;
                        })
                    }
                </div>
            </div>
        </div>
    );

};

export default MonthlyLayoutList;
// {
//     monthlyLayout.length > 0 ?
//         (monthlyLayout.map((layout) => {
//             return <MonthlyLayoutCard key={layout.id} layout={layout} />
//         })
//         ) : (
//             <span style={{ marginTop: "30px" }}>No layouts for this month.</span>
//         )
// }