import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../model/user.js';

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send('You are not logged in');
    }
}

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                User.comparePassword(
                    password,
                    user.password,
                    function (err, isMatch) {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Invalid password',
                            });
                        }
                    }
                );
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

export default passport;
export { ensureAuthenticated };
