import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';

export const LayoutCard = ({ layout }) => {
    const { getLayoutsByUser, deleteLayout } = useContext(LayoutContext);
    const { currentUserId } = useContext(UserProfileContext);
    const history = useHistory();
    const { id } = useParams();

    //handle delete of layout
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this layout?')) {
            deleteLayout(layout.id).then(() => getLayoutsByUser(id));
            history.push(`/layout/${currentUserId}`);
        }
    };

    //brings up the edit form 
    const handleEdit = () => {
        history.push(`/layout/edit/${layout.id}`)
    }

    return (
        <Card className="">
            <CardTitle className="ml-3" tag="h4"><strong>{layout.type}</strong>
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

            {layout.description !== undefined ?
                (<CardText style={{ whiteSpace: 'pre-line' }} className="mx-4 pt-2">   {layout.description}  </CardText>)
                :
                ("")
            }
            {layout.timeEstimate !== undefined ?
                (<CardText style={{ whiteSpace: 'pre-line' }} className="mx-4 pt-2">   {layout.timeEstimate} minutes </CardText>)
                :
                ("")
            }
        </Card>
    )
}
export default LayoutCard;