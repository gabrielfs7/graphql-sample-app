class CreateUserService
{
    create(args) {
        const bcrypt = require('bcryptjs');
        const User = require('../../models/user');

        return User.findOne({ email: args.input.email })
                .then(user => {
                    if (user) {
                        throw new Error('User already exists');
                    }

                    return bcrypt.hash(args.input.password, 12);
                }).then(hashedPassword => {
                    const user = new User({
                        email: args.input.email,
                        username: args.input.username,
                        password: hashedPassword,
                        birthDate: new Date(args.input.birthDate)
                    });

                    return user.save();
                }).then(user => {
                    // Return the document object from mongoose, but format/override fields
                    return {
                        ...user._doc, 
                        password: null,
                        _id: user._doc._id.toString(), 
                        birthDate: user._doc.birthDate.toLocaleDateString() 
                    };
                })
                .catch(err => {
                    throw err;
                });
    }
}

module.exports = new CreateUserService();
