class LoginUserService
{
    login(args) {
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        const User = require('../../models/user');

        const authUser = async () => {
            try {
                const user = await User.findOne({ email: args.input.email });
                const errorMessage = 'Invalid credentials';

                if (!user) {
                    throw new Error(errorMessage);
                }

                const matchPassword = await bcrypt.compare(args.input.password, user.password);

                if (!matchPassword) {
                    throw new Error(errorMessage);
                }

                const token = jwt.sign(
                    {
                        userId: user._id.toString(),
                    },
                    'my-jwt-secret',
                    {
                        expiresIn: '1h'
                    }
                );

                return {
                    userId: user._id.toString(), 
                    token: token,
                    tokenExpiresIn: 1
                };
            } catch (err) {
                throw err;
            }
        };

        return authUser();
    }
}

module.exports = new LoginUserService();
