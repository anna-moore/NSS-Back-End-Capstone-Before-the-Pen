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
    const { isLoggedIn, logout, currentUserId } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    return (
        <header class="header">
            <Navbar color="#CAB9C3" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    <img
                        alt=""
                        src="/LogoTake7.png"
                        width="100%"
                        height="25%"
                        className="d-inline-block  mt-2 "
                    />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}

                        {isLoggedIn && (
                            <>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to={`/layout/${currentUserId}`}>
                                        Layouts
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/monthlyLayoutCreate">
                                        New Monthly Layout
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to={`/monthlyLayout/${currentUserId}`}>
                                        My Monthly Plans
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to={`/inspirationalResources/${currentUserId}`}>
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
        </header >
    );
}