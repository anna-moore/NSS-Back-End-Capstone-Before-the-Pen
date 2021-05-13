import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// this is not being used because the monthly and monthly layout forms are being combined
export const MonthlyLayoutFormAdd = () => {
    const { monthlyLayout, getMonthlyLayoutsByUser, addMonthlyLayout } = useContext(MonthlyLayoutContext);

    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a monthly layout
    const [monthlyId, setMonthlyId] = useState(0);
    const [layoutId, setLayoutId] = useState(0);
    const [inspiredBy, setInspiredBy] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [resourceId, setResourceId] = useState(0);

    //handle click save function 
    const handleClickSave = (evt) => {
        const monthlyLayout = {
            monthlyId,
            layoutId,
            inspiredBy,
            imageURL,
            resourceId
        }
        addMonthlyLayout(monthlyLayout);
        //push to a detail page
    }

    //a return statement with the Form 
    //need a drop down for the layouts 
    //and the resource stretch goal
    return (
        <Form className="container">
            <FormGroup>
                <Label htmlFor="typeOfMediaId">Type of Media </Label>
                <Input
                    type="select"
                    name="typeOfMediaId"
                    id="typeOfMediaId"
                    value={typeOfMediaId}
                    onChange={(e) => {
                        setTypeOfMediaId(e.target.value);
                    }}
                >
                    <option value="1">Type of Media</option>
                    {typeOfMedia.map(t => {
                        return (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
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
                    value={inspiredBy}
                />
            </FormGroup>
            <FormGroup>
                <Label for="imageURL">Image URL</Label>
                <Input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    placeholder={parseInt('2021')}
                    autoComplete="off"
                    onChange={(e) => {
                        setImageURL(e.target.value);
                    }}
                    value={imageURL}
                />
            </FormGroup>
            {monthlyId.replace(/ /g, '').length === 0 ?
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
export default MonthlyLayoutFormAdd;