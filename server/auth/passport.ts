const passport = require('passport');
const LocalStrategy = require( 'passport-local');
import User from '../model/user.js';

function ensureAuthenticated(req: { isAuthenticated: () => any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => any) {
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
        function (email: any, password: any, done: (arg0: null, arg1: boolean | undefined, arg2: { message: string; } | undefined) => any) {
            User.findOne({ email: email }, function (err: any, user: { password: any; }) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                User.comparePassword(
                    password,
                    user.password,
                    function (err: any, isMatch: any) {
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

passport.serializeUser(function (user: { id: any; }, done: (arg0: null, arg1: any) => void) {
    done(null, user.id);
});

passport.deserializeUser(function (id: any, done: (arg0: any, arg1: any) => void) {
    User.getUserById(id, function (err: any, user: any) {
        done(err, user);
    });
});

export default passport;
export { ensureAuthenticated };
