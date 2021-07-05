import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Label } from 'reactstrap';
import { LayoutContext } from '../../providers/LayoutProvider';
import LayoutCard from './LayoutCard';

//This function is responsible for listing all of the layout cards associated with an user
const LayoutList = ({ }) => {
    const { layouts, getLayoutsByUser } = useContext(LayoutContext);

    const { id } = useParams();
    const history = useHistory();

    //gathers users unique data/ layouts
    useEffect(() => {
        if (id) {
            getLayoutsByUser(id);
        }
    }, [id])

    //function to add new layout
    const handleClickNewLayout = () => {
        history.push(`/layoutCreate`)
    }


    return (
        <div className="container mt-5 col-md-5">
            <Label className="text-center  " tag="h2" ><strong>List of Your Layouts</strong>
                <i className="fas fa-plus-circle ml-4 2x"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickNewLayout}
                ></i>
            </Label>

            <div className="row justify-content-center ">
                <div className="cards-column" >
                    {
                        layouts.length > 0 ?
                            (layouts.map((layout) => {
                                return <LayoutCard key={layout.id} layout={layout} />
                            })
                            ) : (
                                <span style={{ marginTop: "30px" }}>No layouts for this user yet.</span>
                            )
                    }
                </div>
            </div>
        </div>
    );
};
export default LayoutList;