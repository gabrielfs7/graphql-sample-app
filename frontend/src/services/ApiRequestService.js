class ApiRequestService 
{
    post = (authContext, requestQueryBody) => {
        return this.request(authContext, 'POST', requestQueryBody);
    }

    request = async(authContext, method, requestQueryBody) => {
        const requestBody = {
            query: requestQueryBody
        };

        const jwtToken = authContext.token;

        return fetch('http://localhost:8080/graphql', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(requestBody)
        }).then(result => {
            if (result.status !== 200 && result.status !== 201) {
                throw new Error('Api error code: ' + result.status);
            }

            return result.json();
        }).then(result => {
            console.log('API CALL RESULT: ', result);

            if (result.errors && result.errors.length > 0) {
                throw new Error('Login error');
            }

            return result;
        });
    }
}

export default ApiRequestService;