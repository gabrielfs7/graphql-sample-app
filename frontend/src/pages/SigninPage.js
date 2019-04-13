import AbstractSignPage from './AbstractSignPage';

class SigninPage extends AbstractSignPage {
    getRequestBody = (email, password) => {
        return {
            query: `
                query {
                    login(input: { email: "${email}", password: "${password}"})
                    {
                        token,
                        tokenExpiresIn
                    }
                }
            `
        };
    }
}

export default SigninPage;