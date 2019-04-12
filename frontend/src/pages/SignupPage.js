import React, { Component } from 'react';
import './Form.css';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.emailElment = React.createRef();
        this.passwordElment = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();

        const email = this.emailElment.current.value;
        const password = this.passwordElment.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return; // @TODO Display error here...
        }

        //@TODO Just login to check if eventHandler is working
        console.log(email);
        console.log(password);

        const requestBody = {
            query: `
                mutation {
                    createUser(input: { email: "${email}", password: "${password}"})
                    {
                        _id,
                        email,
                        password
                    }
                }
            `
        };

        fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            return res.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <form className="form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" ref={this.emailElment} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={this.passwordElment} />
                </div>
                <div className="form-actions">
                    <button type="submit">Signup</button>
                </div>
            </form>
        );
    }
}

export default SignupPage;