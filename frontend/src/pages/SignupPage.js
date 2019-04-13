import AbstractSignPage from './AbstractSignPage';

class SignupPage extends AbstractSignPage {
    getRequestBody = (email, password) => {
        return {
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
    }
}

export default SignupPage;