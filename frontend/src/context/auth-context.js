import React from 'react';

/**
 * Used in entire application to represent its state.
 */
export default React.createContext({
    token: null,
    userId: null,
    tokenExpiresIn: null,
    login: (userId, token, tokenExpiresIn) => { },
    logout: () => { }
});