import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink, useHistory } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
} from 'reactstrap';
import { UserProfileContext } from '../providers/UserProfileProvider';

export default function Header() {
    const { isLoggedIn, logout, currentUserId } = useContext(
        UserProfileContext
    );
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    Before The Pen
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {/* Update the links for all navbar items  */}
                        {isLoggedIn && (
                            <>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/homepage">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/monthlyLayoutCreate">
                                        New Monthly Layout
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to={`/monthlyLayout/${currentUserId}`}>
                                        My Monthlys
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to='/inspirationalResources'>
                                        Bujo Ideas
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: 'pointer' }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}