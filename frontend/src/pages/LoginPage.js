import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.emailElment = React.createRef();
        this.passwordElment = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();

        const email = this.emailElment.current.value
        const password = this.passwordElment.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return; // @TODO Display error here...
        }

        //@TODO Just login to check if eventHandler is working
        console.log(email);
        console.log(password);
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" ref={this.emailElment}/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordElment} />
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