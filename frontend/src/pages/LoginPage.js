import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {
    render() {
        return (
            <form className="login-form">
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="form-actions">
                    <button type="submit">Login</button>
                    <button type="button">Switch to Signup</button>
                </div>
            </form>
        );
    }
}

export default LoginPage;