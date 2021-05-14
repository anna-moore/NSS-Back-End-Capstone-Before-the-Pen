import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import MonthlyLayoutView from './MonthlyLayoutView';
import { Card, Col, Label, Row } from 'reactstrap'

const MonthlyLayoutList = () => {
    const { monthly, getMonthlyByUser } = useContext(MonthlyContext)
    const { currentUserId } = useContext(UserProfileContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getMonthlyByUser(currentUserId)
    }, [])

    const handleClickNewMonthlyLayout = () => {
        history.push(`/monthlyLayoutCreate`)
    }
    //add a create button for creating new monthly layout 
    //map over all of the monthly records/ objects in the array
    return (
        <div className="container">
            <Label tag="h1" className="text-center pb-3">Planned Monthly Layouts
            <i className="fas fa-plus-circle ml-4 2x"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickNewMonthlyLayout}
                ></i>
            </Label>
            <Row className="justify-content-center">
                <Col lg="8">
                    {/* <div className="row justify-content-center" lg={10}> */}
                    <div className="cards-column" >
                        {
                            monthly.length > 0 ?
                                (monthly.map((m) => {
                                    return <MonthlyLayoutView key={m.id} monthly={m} />;
                                }))
                                : (<span style={{ marginTop: "30px" }}>No layouts for this month.</span>)
                        }
                    </div>
                    {/* </div> */}
                </Col>
            </Row>
        </div>
    );
};
export default MonthlyLayoutList;
