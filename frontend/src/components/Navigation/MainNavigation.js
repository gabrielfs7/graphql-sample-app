import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNavigation = props => (
    <header>
        <div className="main-navigation__logo">
            <h1>The Navbar</h1>
        </div>
        <nav className="main-navigation__item">
            <ul>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tasks">
                        Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users">
                        Users
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default mainNavigation;