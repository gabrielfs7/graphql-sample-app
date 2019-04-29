import AbstractSignPage from './AbstractSignPage';

class SigninPage extends AbstractSignPage {
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

export default SigninPage;