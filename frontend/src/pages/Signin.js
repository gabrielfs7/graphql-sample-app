import AbstractSign from './AbstractSign';
import AuthContext from '../context/auth-context';

class Signin extends AbstractSign {
    /**
     * Necessary to pass the context to the App main component.
     */
    static contextType = AuthContext;

    /**
     * @inheritdoc
     */
    getPageTitle() {
        return 'Sigin';
    }

    /**
     * @inheritdoc
     */
    getRequestBody = (email, password) => {
        return `query {
                login(input: { email: "${email}", password: "${password}"})
                {
                    userId,
                    token,
                    tokenExpiresIn
                }
            }
        `;
    }

    /**
     * @inheritdoc
     */
    handleResponse = (res) => {
        this.context.login(
            res.data.login.userId,
            res.data.login.token,
            res.data.login.tokenExpiresIn,
        );
    }
}

export default Signin;