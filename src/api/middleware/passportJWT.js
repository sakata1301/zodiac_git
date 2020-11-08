const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../../api/resources/user/user.model');

const configJWTStrategy = () => {
    const otps = {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'sakata1301'
    }

    passport.use(new passportJWT.Strategy(otps, (userID, done) => {
        User.findOne({ _id: userID.id }, (err, userSA) => {
            if (err) {
                return done(err, false);
            }
            if (userSA) {
                return done(null, userSA);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }))
}

module.exports = configJWTStrategy;