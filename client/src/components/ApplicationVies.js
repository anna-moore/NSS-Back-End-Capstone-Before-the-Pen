import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { CommentProvider } from '../providers/CommentProvider';
import PostList from './posts/PostList';
import CommentList from './comments/CommentList';
import { PostDetails } from './posts/PostDetails';
import { PostForm } from './posts/PostForm';
import { UserProfileList } from './userProfiles/UserProfileList';
import { UserProfileDetails } from './userProfiles/UserProfileDetails';
import Login from './Login';
import Register from './Register';
import Hello from './Hello';
import TagList from './tags/TagList';
import TagForm from './tags/TagForm';
import CategoryList from './categories/CategoryList';
import PostTagForm from './postTags/PostTagForm';
import SearchResults from './posts/SearchResults';

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
}