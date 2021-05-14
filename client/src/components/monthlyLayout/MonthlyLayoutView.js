import React, { useState, useContext, useEffect } from 'react';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { Table, Card, CardTitle } from 'reactstrap';

// this function has the monthly data passed in through props 
//and from here grabs the monthlyLayout with the use of the getMonthlyLayoutsById
export const MonthlyLayoutView = ({ monthly }) => {
    const { getMonthlyLayoutsById } = useContext(MonthlyLayoutContext);
    const [currentMonthlyLayoutArray, setCurrentMonthlyLayoutArray] = useState([])

    // this grabs the id off of the monthly object so that the provider method can be called for the monthlyLayouts
    let monthlyId = parseInt(monthly.id)

    useEffect(() => {
        getMonthlyLayoutsById(monthlyId).then((monthlyLayoutArray) => setCurrentMonthlyLayoutArray(monthlyLayoutArray))
    }, []);

    return (
        <>
            <Card className="mt-2 mb-3 p-2">
                <CardTitle className="h2 ml-2" color="#E4DBE1"> {monthly.month} {monthly.year}</CardTitle>
                <div  >
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Layout Type</th>
                                <th>Inspired By</th>
                                {/* <th>Image URL</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentMonthlyLayoutArray.map((ml) => {
                                    return <tr key={ml.id}>
                                        <td>{ml.layout.type}</td>
                                        <td> <a href={ml.imageURL}>{ml.inspiredBy}</a></td>
                                        {/* <td>{ml.imageURL}</td> */}
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>

                </div>
            </Card>
        </>
    )
}
export default MonthlyLayoutView;