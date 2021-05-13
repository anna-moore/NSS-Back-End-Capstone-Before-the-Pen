import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';

const MonthlyLayoutCard = ({ layout }) => {
    const { getMonthlyLayoutsByUser, deleteMonthlyLayout } = useContext(MonthlyLayoutContext);
    const history = useHistory();
    const { id } = useParams();

    //handle delete functions
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this layout?')) {
            deleteMonthlyLayout(layout.id).then(() => getMonthlyLayoutsByUser(id));
            history.push(`/monthlyLayout/${id}`);
        }
    };

    //handle edit function
    const handleEdit = () => {
        history.push(`monthlyLayout/${id}`)
    }

    return (
        <Card className="m-4">
            <CardBody style={{ width: "35em" }}>
                <CardTitle tag="h5"><strong>{layout.monthly.month} {layout.monthly.year}</strong>
                    <i
                        className="fas fa-trash-alt float-right"
                        onClick={handleDelete}
                        style={{ cursor: 'pointer' }}
                    ></i>
                    {/* <i
                        className="fas fa-edit float-right "
                        onClick={handleEdit}
                        style={{ cursor: 'pointer' }}
                    ></i> */}
                </CardTitle>
                <CardText>
                    {/* need to map over this to only create one card instead of multipe */}
                    {/* also think about how to show the nullable data as well  */}
                    {layout.layout.type}
                </CardText>
            </CardBody>
        </Card>
    );
};
export default MonthlyLayoutCard;