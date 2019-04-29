import AbstractSignPage from './AbstractSignPage';

class SignupPage extends AbstractSignPage {
    /**
     * @inheritdoc
     */
    getPageTitle() {
        return 'Sigup';
    }

    /**
     * @inheritdoc
     */
    getRequestBody = (email, password) => {
        return `mutation {
                createUser(input: { email: "${email}", password: "${password}"})
                {
                    _id,
                    email,
                    password
                }
            }
        `;
    }
}

export default SignupPage;