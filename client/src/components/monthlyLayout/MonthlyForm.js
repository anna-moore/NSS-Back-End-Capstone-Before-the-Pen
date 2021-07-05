import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyContext } from '../../providers/MonthlyProvider';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { LayoutContext } from '../../providers/LayoutProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider'
import { InspoResourceContext } from '../../providers/InspirationalResourceProvider';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export const MonthlyFormAdd = () => {
    const { monthly, getMonthlyById, addMonthly, getMonthlyByUser } = useContext(MonthlyContext);
    const { addMonthlyAndLayout } = useContext(MonthlyLayoutContext);
    const { layouts, getLayoutsByUser } = useContext(LayoutContext);
    const { inspoResource, getInspoResourceByUser } = useContext(InspoResourceContext)
    const { currentUserId } = useContext(UserProfileContext);

    const history = useHistory();
    const { id } = useParams();

    //this is the properties on the monthly
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(2021);
    const [style, setStyle] = useState('');


    //this is for the items that are checked
    const [checkedLayouts, setCheckedLayouts] = useState([])

    //holds the object that I can making copies of
    const [monthlyLayout] = useState();

    //this one is a list see the "s"
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
            //loop through checkedlayouts array
            //determine if matches in monthlylayouts exist
            //if not add the missing if
            for (let layoutId of checkedLayouts) {
                let layoutToAdd = monthlyLayouts.find((layout) => layoutId === layout.id)
                if (!layoutToAdd) {
                    let toAdd = { layoutId }
                    monthlyLayouts.push(toAdd)
                }

            }
            addMonthlyAndLayout(monthly, monthlyLayouts)
                .then(() => history.push(`/monthlyLayout/${currentUserId}`))
        }
    }

    //function for adding a new layout
    const handleClickNewLayout = () => {
        history.push(`/layoutCreate`)
    }

    //a return statement with the Form 
    return (
        <Form className="container col-md-10">
            <Label className="text-center pb-4" for="MonthlyAndLayoutForm" tag="h2"> <strong>Create Monthly Layout</strong></Label>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="month"><strong>Month</strong></Label>
                        <Input
                            style={{ width: '70%' }}
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
                        <Label for="year"><strong>Year</strong></Label>
                        <Input
                            style={{ width: '70%' }}
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
                        <Label for="style"><strong>Style</strong></Label>
                        <Input
                            style={{ width: '70%' }}
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
                </Col>
                <Col>

                    <Label for="addNewLayouts"> <strong>Add Layouts</strong> (and optional info)
                        <i className="fas fa-plus-circle ml-4 2x"
                            style={{ cursor: 'pointer' }}
                            onClick={handleClickNewLayout}
                        ></i>
                    </Label>
                    <FormGroup>
                        {
                            //* mapping over the layouts */}
                            layouts.map((layout) => {
                                const layoutId = parseInt(layout.id)

                                //once a item is checked the entire item is replaced with the checked item and the optional boxes
                                if (checkedLayouts.includes(layoutId)) {
                                    return (<>
                                        {/* this returns the label and the checkbox */}
                                        <FormGroup>
                                            <input
                                                key={layout.id}
                                                type="checkbox"
                                                checked={checkedLayouts.includes(layoutId)}
                                                id="checkbox"
                                                onChange={(e) => handleCheckboxChange(e)}
                                                value={layout.id}
                                            />
                                            <label htmlFor="">{layout.type}</label>
                                        </FormGroup>
                                        {/* this is what dropdown once checkbox is checked */}
                                        <Row>
                                            <Col md={6}>

                                                <FormGroup >
                                                    <Label for="inspiredBy">Inspired by </Label>
                                                    {/* <a href="#imageURL" class=""> */}
                                                    <Input
                                                        //style={{ width: '80%' }}
                                                        type="text"
                                                        name="inspiredBy"
                                                        id={layout.id}
                                                        placeholder="name of artist"
                                                        autoComplete="off"
                                                        onChange={(e) => {
                                                            inspiredByForLayouts(layout.id, e.target.value);
                                                        }}
                                                        value={layout.inspiredBy}
                                                        className=""
                                                    />
                                                    {/* </a> */}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>

                                                <FormGroup>
                                                    <Label for="imageURL">Image URL</Label>
                                                    <Input
                                                        // style={{ width: '80%' }}
                                                        type="text"
                                                        name="imageURL"
                                                        id="imageURL"
                                                        placeholder="add a picture url"
                                                        autoComplete="off"
                                                        onChange={(e) => {
                                                            imageURLForLayouts(layout.id, e.target.value);
                                                        }}
                                                        value={layout.imageURL}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

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
                </Col>
            </Row>
            {month.replace(/ /g, '').length === 0 ?
                <Button disabled
                    style={{ cursor: 'pointer' }}
                    className="float-right mr-4"
                >
                    Save
                </Button>
                :
                <Button active
                    //color="primary"
                    style={{ cursor: 'pointer' }}
                    className="float-right mr-4"
                    onClick={handleClickSave}>
                    Save
                </Button>
            }
        </Form>
    )
}
export default MonthlyFormAdd;

