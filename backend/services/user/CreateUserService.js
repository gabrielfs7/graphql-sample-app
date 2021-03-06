class CreateUserService
{
    create(args) {
        const bcrypt = require('bcryptjs');
        const User = require('../../models/user');

        const newUser = async () => {
            try {
                const user = await User.findOne({ email: args.input.email });

                if (user) {
                    throw new Error('User already exists');
                }

                const hashPassword = await bcrypt.hash(args.input.password, 12);
                const newUser = new User({
                    email: args.input.email,
                    password: hashPassword
                });

                const savedUser = await newUser.save();

                return {
                    ...savedUser._doc, 
                    password: null,
                    _id: savedUser._doc._id.toString()
                };
            } catch (err) {
                throw err;
            }
        };

        return newUser();
    }
}

module.exports = new CreateUserService();
