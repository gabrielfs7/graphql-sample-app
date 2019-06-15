import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css'; 

class App extends Component {
    /**
     * Empty application state.
     */
    state = {
        userId: null,
        token: null,
        tokenExpiresIn: null,
    };

    /**
     * Save application user auth data to application state.
     */
    login = (userId, token, tokenExpiresIn) => {
        this.setState({
            userId: userId,
            token: token,
            tokenExpiresIn: tokenExpiresIn
        });

        console.log('LOGIN - App state changed: ', this.state);
    };

    /**
     * Clean application state.
     */
    logout = () => {
        this.setState({
            userId: null,
            token: null,
            tokenExpiresIn: null
        });

        console.log('LOGOUT - App state changed: ', this.state);
    };

    /**
     * Render JSX component.
     */
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext.Provider value={{
                        userId: this.state.userId,
                        token: this.state.token,
                        login: this.login,
                        logout: this.logout
                    }}>
                        <MainNavigation />
                        <main className="main-content">
                            <Switch>
                                {!this.state.token && (
                                    <Redirect from="/" to="/signin" exact />
                                )}
                                {this.state.token && (
                                    <Redirect from="/signin" to="/tasks" exact />
                                )}
                                {this.state.token && (
                                    <Redirect from="/signup" to="/tasks" exact />
                                )}
                                {!this.state.token && (
                                    <Route path="/signin" component={Signin} />
                                )}
                                {!this.state.token && (
                                    <Route path="/signup" component={Signup} />
                                )}
                                <Route path="/tasks" component={Tasks} />
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    };
}

export default App;
