class ListUserService
{
    list() {
        const User = require('../../models/user');

        return User.find()
            .then(
                users => {
                    // It is necessary to get _doc of each document to remove extra metadata
                    return users.map(user => {
                        // Return the document object from mongoose, but format/override fields
                        return { 
                            ...user._doc, 
                            password: null,
                            _id: user._doc._id.toString(), 
                            birthDate: user._doc.birthDate.toLocaleDateString() 
                        } 
                    });
                }
            ).catch(err => {
                throw err;
            });
    }
}

module.exports = new ListUserService();
