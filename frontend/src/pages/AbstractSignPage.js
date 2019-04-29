import React from 'react';
import AuthContext from '../context/auth-context';
import ApiRequestService from '../services/ApiRequestService';

import './Form.css';
import './SignPage.css';

class AbstractSignPage extends React.Component {
    /**
     * Necessary to pass the context to the App main component.
     */
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailElment = React.createRef();
        this.passwordElment = React.createRef();
    }

    /**
     * Get page title.
     */
    getPageTitle() {}

    /**
     * Handle the <form> submition event.
     */
    submitHandler = (event) => {
        event.preventDefault();

        const email = this.emailElment.current.value;
        const password = this.passwordElment.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        const requestQueryBody = this.getRequestBody(email, password);
        const apiRequestService = new ApiRequestService();

        apiRequestService.post({}, requestQueryBody).then(result => {
            console.log('SIGN PAGE RESULT: ');
            console.log(result);

            this.handleResponse(result);
        }).catch( err => {
            console.log('SIGN PAGE ERROR!!!!! ');
            console.log(err);
            throw err;
        });
    }

    /**
     * Handle backend API response. Override this method.
     */
    handleResponse = (res) => {}

    /**
     * Prepare API request body. Override this method.
     */
    getRequestBody = (email, password) => {}

    /**
     * Render the JSX component of the form.
     */
    render() {
        return (
            <form className="sign-page form" onSubmit={this.submitHandler}>
                <h1>{this.getPageTitle()}</h1>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" required id="email" ref={this.emailElment} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={this.passwordElment} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        );
    }
}

export default AbstractSignPage;