import React from 'react';
import './Form.css';

class AbstractSignPage extends React.Component {
    constructor(props) {
        super(props);
        this.emailElment = React.createRef();
        this.passwordElment = React.createRef();
        this.errorMessage = '';
    }

    submitHandler = (event) => {
        event.preventDefault();

        const email = this.emailElment.current.value;
        const password = this.passwordElment.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return; // @TODO Display error here...
        }

        const requestBody = this.getRequestBody(email, password);

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

    getRequestBody = (email, password) => {
        // Override method...
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
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default AbstractSignPage;