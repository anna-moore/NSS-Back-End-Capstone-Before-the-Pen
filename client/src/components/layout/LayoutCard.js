import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const LayoutCard = ({ layout }) => {
    const { getLayoutByUser } = useContext(LayoutContext);
    const { currentUserId } = useContext(UserProfileContext);

    //handle delete of layout
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this layout?')) {
            deleteLayout(layout.id).then(() => getLayoutByUser(id));
            history.push(`/inspirationalResources/${currentUserId}`);
        }
    };

    //brings up the edit form 
    const handleEdit = () => {
        history.push(`/`)
    }

    return (
        <Card className="">
            <CardTitle className="ml-3" tag="h4"><strong>{layout.name}</strong>
                <i
                    className="fas fa-trash-alt float-right pl-2"
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                ></i>
                <i
                    className="fas fa-edit float-right "
                    onClick={handleEdit}
                    style={{ cursor: 'pointer' }}
                ></i>
            </CardTitle>
            {/* what other information should be added here? */}
        </Card>
    )
}
export default LayoutCard;