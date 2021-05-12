import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider'
//import { TypeOfMediaContext } from '../../providers/TypeOfMediaProvider';
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import Checkbox from './Checkbox';


//how to make the require fields required? 
export const MonthlyFormAdd = () => {
    const { monthly, getMonthlyById, addMonthly, getMonthlyByUser } = useContext(MonthlyContext);
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
    // const [layoutId, setLayoutId] = useState(0);
    // const [inspiredBy, setInspiredBy] = useState('');
    // const [imageURL, setImageURL] = useState('');
    // const [resourceId, setResourceId] = useState(0);


    //this is for the items that are checked
    const [checkedLayouts, setCheckedLayouts] = useState([])

    //holds the object that I can making copies of
    const [monthlyLayout] = useState();

    //this one is a list see the s
    const [monthlyLayouts, setMonthlyLayouts] = useState([]);

    //this is for unique month and year in the database
    const [uniqueMonthCheck, setUniqueMonthCheck] = useState([]);

    //an use Effect needs currentUserId
    useEffect(() => {
        getLayoutsByUser(currentUserId)
            .then(() => {
                getInspoResourceByUser(currentUserId)
            })

    }, []);

    //this useEffect fills the state to ensure unique monthly data
    useEffect(() => {
        getMonthlyByUser(currentUserId)
            .then(setUniqueMonthCheck)
            .then(console.log(uniqueMonthCheck))

    }, []);

    let newUnfilteredLayoutItems = [...monthlyLayouts]

    //will need to two items for the url of a image and inspired by
    const inspiredByForLayouts = (layoutId, inspiredBy) => {

        let itemToEdit = newUnfilteredLayoutItems.find(o => parseInt(o.layoutId) === (parseInt(layoutId)))

        if (itemToEdit) {
            let itemIndex = newUnfilteredLayoutItems.findIndex((i => i.layoutId === layoutId));

            newUnfilteredLayoutItems[itemIndex].inspiredBy = inspiredBy

            setMonthlyLayouts(newUnfilteredLayoutItems);

        } else {
            let newMonthlyLayout = { ...monthlyLayout }

            newMonthlyLayout.layoutId = layoutId;
            newMonthlyLayout.inspiredBy = inspiredBy;

            newUnfilteredLayoutItems.push(newMonthlyLayout);

            setMonthlyLayouts(newUnfilteredLayoutItems);

        }
        console.log(newUnfilteredLayoutItems)
    }

    //this is the filter and add to state for the image URL property of monthly layout/form
    const imageURLForLayouts = (layoutId, imageURL) => {

        let itemToEdit = newUnfilteredLayoutItems.find(o => parseInt(o.layoutId) === (parseInt(layoutId)))

        if (itemToEdit) {
            let itemIndex = newUnfilteredLayoutItems.findIndex((i => i.layoutId === layoutId));

            newUnfilteredLayoutItems[itemIndex].imageURL = imageURL

            setMonthlyLayouts(newUnfilteredLayoutItems);

        } else {
            let newMonthlyLayout = { ...monthlyLayout }

            newMonthlyLayout.layoutId = layoutId;
            newMonthlyLayout.imageURL = imageURL;

            newUnfilteredLayoutItems.push(newMonthlyLayout);

            setMonthlyLayouts(newUnfilteredLayoutItems);

        }
        console.log(newUnfilteredLayoutItems)
    }

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
        if (uniqueMonthCheck.find((m) => (m.month === month && m.year === parseInt(year)))) {
            window.alert("It looks like you already have your layouts planned for this month.")
        } else {
            //add window alerts for must haves/ non nullable items 
            const monthly = {
                month,
                year,
                style
            }

            addMonthlyAndLayout(monthly, monthlyLayouts)
                .then(() => history.push(`/monthlyLayout/${currentUserId}`))
            //I think that I need to push to the next part of the form here
        }
    }

    //a return statement with the Form 
    return (
        <Form className="container">
            <Label for="MonthlyAndLayoutForm"><strong>Add a new Monthly Layout</strong></Label>
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
                    required
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
                    required
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
                    required
                />
            </FormGroup>
            <Label for="addNewLayouts">Add Layouts</Label>


            <FormGroup>
                {/* <Label for="checkboxLayout">Check box Layouts</Label> */}
                {
                    //* mapping over the layouts */}
                    layouts.map((layout) => {
                        const layoutId = parseInt(layout.id)
                        //console.log(layout)

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
                                        id={layout.id}
                                        placeholder="name of artist"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            inspiredByForLayouts(layout.id, e.target.value);
                                        }}
                                        value={layout.inspiredBy}
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
                                            imageURLForLayouts(layout.id, e.target.value);
                                        }}
                                        value={layout.imageURL}
                                    />
                                </FormGroup>
                            </>)
                        }
                        // another return statement that displays the check box that aren't in the checkedlayout list
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




//this is when the layout was a drop down feature
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