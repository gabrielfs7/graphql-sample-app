/**
 * CORS (Cross Origin Resource Sharing), http methods and headers validation.
 */
module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //@TODO Enable specific domains
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }

    return next();
}