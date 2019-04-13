/**
 * Used in entire application to represent application state
 */

import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    tokenExpiresIn: null,
    login: (userId, token, tokenExpiresIn) => { },
    logout: () => { }
});