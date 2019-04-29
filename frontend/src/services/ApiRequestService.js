class ApiRequestService 
{
    get = (authContext, requestQueryBody) => {
        return this.request(authContext, 'GET', requestQueryBody);
    }

    post = (authContext, requestQueryBody) => {
        return this.request(authContext, 'POST', requestQueryBody);
    }

    request = async(authContext, method, requestQueryBody) => {
        const requestBody = {
            query: requestQueryBody
        };

        const jwtToken = authContext.token;

        const result = await fetch('http://localhost:8080/graphql', {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(requestBody)
        });

        if (result.status !== 200 && result.status !== 201) {
            throw new Error('Api error code: ' + result.status);
        }

        return result;
    }
}

export default ApiRequestService;