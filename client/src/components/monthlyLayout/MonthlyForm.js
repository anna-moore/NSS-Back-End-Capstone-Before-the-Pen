import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { LayoutContext } from '../../providers/LayoutProvider';
//import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import Checkbox from './Checkbox';
import { UserProfileContext } from '../../providers/UserProfileProvider';

//how to make the require fields required? 
export const MonthlyFormAdd = () => {
    const { monthly, getMonthlyById, addMonthly } = useContext(MonthlyContext);
    const { addMonthlyAndLayout } = useContext(MonthlyLayoutContext);
    const { layouts, getLayoutsByUser } = useContext(LayoutContext);
    const { inspoResource, getInspoResourceByUser } = useContext(InspoResourceContext)
    const { currentUserId } = useContext(UserProfileContext);

    // const [CurentMonthly, setCurrentMonthly] = useState({});
    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a monthly layout
    // const [UserProfile] = useState(''); this is done in the controller??
    //this is the properties on the monthly
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(2021);
    const [style, setStyle] = useState('');

    //this is the properties on the monthlyLayout 
    //const [monthlyId, setMonthlyId] = useState(0); this is done in the controller yes??
    const [layoutId, setLayoutId] = useState(0);
    const [inspiredBy, setInspiredBy] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [resourceId, setResourceId] = useState(0);


    //this is for the items that are checked
    const [checkedLayouts, setCheckedLayouts] = useState([])

    //an use Effect needs currentUserId
    useEffect(() => {
        getLayoutsByUser(currentUserId)
            .then(() => {
                getInspoResourceByUser(currentUserId)
            })

    }, []);

    //handle checkbox change
    const handleCheckboxChange = (event) => {
        const layoutId = parseInt(event.target.value)
        const idPosition = checkedLayouts.indexOf(layoutId)

        if (idPosition >= 0) {
            const layoutArray = [...checkedLayouts]
            layoutArray.splice(idPosition, 1)
            setCheckedLayouts(layoutArray)
        } else if (idPosition < 0) {
            setCheckedLayouts([layoutId, ...checkedLayouts])
        }

    }

    //handle click save function 
    const handleClickSave = (evt) => {
        evt.preventDefault();

        if (id) {

        }
        //add window alerts for must haves/ non nullable items 
        const monthly = {
            month,
            year,
            style
        }
        const monthlyLayout = {
            layoutId,
            inspiredBy,
            imageURL,
            resourceId
        }
        addMonthlyAndLayout(monthly, monthlyLayout)
            .then(() => history.push(`/monthlyLayout/${currentUserId}`))
        //I think that I need to push to the next part of the form here
    }

    //a return statement with the Form 
    return (
        <Form className="container">
            <Label for="MonthlyAndLayoutForm">Add a new Monthly Layout</Label>
            <FormGroup>
                <Label for="month">Month</Label>
                <Input
                    type="text"
                    name="month"
                    id="month"
                    placeholder="January "
                    autoComplete="off"
                    onChange={(e) => {
                        setMonth(e.target.value);
                    }}
                    value={month}
                />
            </FormGroup>
            <FormGroup>
                <Label for="year">Year</Label>
                <Input
                    type="text"
                    name="year"
                    id="year"
                    placeholder={parseInt('2021')}
                    autoComplete="off"
                    onChange={(e) => {
                        setYear(e.target.value);
                    }}
                    value={year}
                />
            </FormGroup>
            <FormGroup>
                <Label for="style">Style</Label>
                <Input
                    type="text"
                    name="style"
                    id="style"
                    placeholder="i.e. mininalist, scrapbook, maximalist"
                    autoComplete="off"
                    onChange={(e) => {
                        setStyle(e.target.value);
                    }}
                    value={style}
                />
            </FormGroup>
            <Label for="addNewLayouts">Add Layouts</Label>
            {/* <FormGroup>
                <Label htmlFor="layoutId">Layout </Label>
                <Input
                    type="select"
                    name="layoutId"
                    id="layoutId"
                    value={layoutId}
                    onChange={(e) => {
                        setLayoutId(e.target.value);
                    }}
                >
                    <option value="1">Layouts</option>
                    {layouts.map(l => {
                        return (
                            <option key={l.id} value={l.id}>
                                {l.type}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup> */}

            <FormGroup>
                {/* <Label for="checkboxLayout">Check box Layouts</Label> */}
                {
                    //* mapping over the layouts */}
                    layouts.map((layout) => {
                        const layoutId = parseInt(layout.id)
                        console.log(layout)

                        //once a item is checked the entire item is replaced with the checked item and the optional boxes
                        if (checkedLayouts.includes(layoutId)) {
                            return (<>
                                {/* this returns the label and the checkbox */}
                                <FormGroup>
                                    <label htmlFor="">{layout.type}</label>
                                    <input
                                        key={layout.id}
                                        type="checkbox"
                                        checked={checkedLayouts.includes(layoutId)}
                                        id="checkbox"
                                        onChange={(e) => handleCheckboxChange(e)}
                                        value={layout.id}
                                    />
                                </FormGroup>
                                {/* this is what dropdown once checkbox is checked */}
                                <Label for="thisCheckBoxItemSelected"><strong>Optional Info</strong></Label>
                                <FormGroup>
                                    <Label for="inspiredBy">Inspired by </Label>
                                    <Input
                                        type="text"
                                        name="inspiredBy"
                                        id="inspiredBy"
                                        placeholder="name of artist"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setInspiredBy(e.target.value);
                                        }}
                                    // value={inspiredBy}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageURL">Image URL</Label>
                                    <Input
                                        type="text"
                                        name="imageURL"
                                        id="imageURL"
                                        placeholder="add a picture url here"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setImageURL(e.target.value);
                                        }}
                                    // value={imageURL}
                                    />
                                </FormGroup>
                            </>)
                        }
                        // another return statement that displays the check box
                        return (
                            <FormGroup key={layout.id} check>
                                <Label check >
                                    <Input
                                        type="checkbox"
                                        key={layout.id}
                                        checked={checkedLayouts.includes(layoutId)}
                                        id="checkbox"
                                        onChange={(e) => handleCheckboxChange(e)}
                                        value={layout.id}
                                        defaultChecked
                                    /> {layout.type}

                                </Label>
                            </FormGroup>
                        )
                    })

                }
            </FormGroup>




            {/* <FormGroup>
                <Label for="inspiredBy">Inspired by </Label>
                <Input
                    type="text"
                    name="inspiredBy"
                    id="inspiredBy"
                    placeholder="name of artist"
                    autoComplete="off"
                    onChange={(e) => {
                        setInspiredBy(e.target.value);
                    }}
                    value={inspiredBy}
                />
            </FormGroup>
            <FormGroup>
                <Label for="imageURL">Image URL</Label>
                <Input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    placeholder="add a picture url here"
                    autoComplete="off"
                    onChange={(e) => {
                        setImageURL(e.target.value);
                    }}
                    value={imageURL}
                />
            </FormGroup> */}

            {month.replace(/ /g, '').length === 0 ?
                <Button disabled
                    style={{ cursor: 'pointer' }}
                >
                    Save
                    </Button>
                :
                <Button active
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickSave}>
                    Save
                </Button>
            }
        </Form>
    )
}
export default MonthlyFormAdd;


// this is for the resource which is a stretch goal 

// <FormGroup>
// <Label htmlFor="resourceId">Resource </Label>
// <Input
//     type="select"
//     name="resourceId"
//     id="resourceId"
//     value="1"
//     onChange={(e) => {
//         setResourceId(e.target.value);
//     }}
// >
//     <option value="1">Resource</option>
//     {inspoResource.map(r => {
//         return (
//             <option key={r.id} value={r.id}>
//                 {r.url}
//             </option>
//         );
//     })}
// </Input>
// </FormGroup>