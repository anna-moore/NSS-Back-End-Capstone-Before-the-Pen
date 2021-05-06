import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MonthlyLayoutContext } from '../../providers/MonthlyLayoutProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const MonthlyLayoutFormAdd = () => {
    const { monthlyLayout, getMonthlyLayoutsByUser } = useContext(MonthlyLayoutContext);
    const history = useHistory();
    const { id } = useParams();

    //states for all of the properties of a monthly layout
    const [] = useState('');
    const [] = useState('');
    const [] = useState('');
    const [] = useState('');
    const [] = useState('');


    //an use Effect 

    //handle click save function 

    //a return statement with the Form 
}
export default MonthlyLayoutFormAdd;