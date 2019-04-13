import AbstractSignPage from './AbstractSignPage';
import AuthContext from '../context/auth-context';

class SigninPage extends AbstractSignPage {
    /**
     * Necessary to pass the context to the App main component.
     */
    static contextType = AuthContext;

    getRequestBody = (email, password) => {
        return {
            query: `
                query {
                    login(input: { email: "${email}", password: "${password}"})
                    {
                        userId,
                        token,
                        tokenExpiresIn
                    }
                }
            `
        };
    }

    handleResponse = (res) => {
        return res.json()
            .then(res => {
                this.context.login(
                    res.data.login.userId,
                    res.data.login.token,
                    res.data.login.tokenExpiresIn,
                );
            });
    }
}

export default SigninPage;