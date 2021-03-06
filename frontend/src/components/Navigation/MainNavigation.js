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
                                    <React.Fragment>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signin">Signin</NavLink>
                                        </li>
                                    </React.Fragment>
                                )
                            }
                            {
                                /** 
                                 * Only list tasks is user is signed in
                                 */
                                context.token && (
                                    <React.Fragment>
                                        <li>
                                            <NavLink to="/tasks">Tasks</NavLink>
                                        </li>
                                        <li>
                                            <button onClick={context.logout}>Logout</button>
                                        </li>
                                    </React.Fragment>
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