import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import Login from './Login';
import Register from './Register';
import Hello from './Hello';
import Homepage from '../components/homepage/Homepage';
import LayoutFormAdd from '../components/layout/LayoutFormAdd';
import LayoutFormEdit from './layout/LayoutFormEdit';
import MonthlyForm from '../components/monthlyLayout/MonthlyForm';
import MonthlyLayoutList from '../components/monthlyLayout/MonthlyLayoutList';
import ResourceFormAdd from '../components/inspirationalResource/ResourceFormAdd';
import ResourceFormEdit from '../components/inspirationalResource/ResourceFormEdit'
import ResourceList from './inspirationalResource/ResourceList';

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Homepage /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/layoutCreate" exact>
                    {isLoggedIn ? <LayoutFormAdd /> : <Redirect to="/login" />}
                </Route>
                <Route path="/layout/edit/:id(\d+)" exact>
                    {isLoggedIn ? <LayoutFormEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/monthlyLayoutCreate" exact>
                    {isLoggedIn ? <MonthlyForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/monthlyLayout/:id(\d+)" exact>
                    {isLoggedIn ? <MonthlyLayoutList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/inspirationalResources/:id(\d+)" exact>
                    {isLoggedIn ? <ResourceList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/inspirationalResources/create" exact>
                    {isLoggedIn ? <ResourceFormAdd /> : <Redirect to="/login" />}
                </Route>

                <Route path="/inspirationalResources/edit/:id(\d+)" exact>
                    {isLoggedIn ? <ResourceFormEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
}