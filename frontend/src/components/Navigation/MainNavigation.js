import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './MainNavigation.css';

/**
 * Main navigation JSX component.
 * 
 * @param {*} props 
 */
const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>Easy<span>Todo</span></h1>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {
                                /**
                                 * Only displays signup if user is not signed in
                                 */
                                !context.token && (
                                    <li>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </li>
                                )
                            }
                            {
                                /** 
                                 * Only displays sigin if user is not signed in 
                                 */
                                !context.token && (
                                    <li>
                                        <NavLink to="/signin">Signin</NavLink>
                                    </li>
                                )
                            }
                            {
                                /**
                                 * Only list tasks is user is signed in
                                 */
                                context.token && (
                                    <li>
                                        <NavLink to="/tasks">Tasks</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </header>
            );
        }}
    </AuthContext.Consumer>
);

export default mainNavigation;