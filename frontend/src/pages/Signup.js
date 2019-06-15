import AbstractSign from './AbstractSign';

class Signup extends AbstractSign {
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

export default Signup;