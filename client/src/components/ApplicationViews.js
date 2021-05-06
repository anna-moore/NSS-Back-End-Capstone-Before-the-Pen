import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import Login from './Login';
import Register from './Register';
import Hello from './Hello';
import Homepage from '../components/homepage/Homepage';
// import MonthlyLayoutFormAdd from '../components/monthlylayout/MonthlyLayoutFormAdd';
import MonthlyLayoutList from '../components/monthlyLayout/MonthlyLayoutList'


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                {/* change to homepage */}
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/homepage" exact>
                    {isLoggedIn ? <Homepage /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/monthlyLayoutCreate" exact>
                    {isLoggedIn ? <MonthlyLayoutFormAdd /> : <Redirect to="/login" />}
                </Route> */}

                <Route path="/monthlyLayout/:id(\d+)" exact>
                    {isLoggedIn ? <MonthlyLayoutList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
}