module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    const authHeader = req.get('Authorization'); // Authorization: Bearer <<TOKEN>>
    
    req.authenticated = false;

    if (authHeader) {
        const authToken = authHeader.split(' ')[1];

        if (authToken && authToken.length > 1) {
            try {
                const tokenPayload = jwt.verify(authHeader, 'my-jwt-secret');

                req.authenticated = true;
                req.authUser = { 
                    id: tokenPayload.userId 
                };
            } catch (err) {
                console.log('Invalid auth token header');
            }
        }
    }

    return next();
}