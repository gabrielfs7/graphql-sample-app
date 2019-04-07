class LoginUserService
{
    login(args) {
        const bcrypt = require('bcryptjs');
        const User = require('../../models/user');

        const authUser = async () => {
            try {
                const user = await User.findOne({ email: args.input.email });
                const errorMessage = 'Invalid credentials';

                if (!user) {
                    throw new Error(errorMessage);
                }

                const hashPassword = await bcrypt.hash(args.input.password, 12);

                if (user.password !== hashPassword) {
                    throw new Error(errorMessage + " " + user.password + " " + hashPassword);
                }

                return {
                    userId: user._id.toString(), 
                    token: 'token-expirable',
                    tokenExpiresAt: new Date().getTime()
                };
            } catch (err) {
                throw err;
            }
        };

        return authUser();
    }
}

module.exports = new LoginUserService();
