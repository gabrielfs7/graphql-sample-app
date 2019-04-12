import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Easy<span>Todo</span></h1>
        </div>
        <nav className="main-navigation__items">
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
            </ul>
        </nav>
    </header>
);

export default mainNavigation;