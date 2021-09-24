import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model/user';

import joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express'; //should be imported

const ensureAuthenticated = (schema: ObjectSchema = joi.object({})): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(401).send('You are not logged in');
    }
    next();
  };
};

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        function (email: any, password: any, done: any) {
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

passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
});

passport.deserializeUser(function (id: any, done: any) {
    User.getUserById(id, function (err: any, user: any) {
        done(err, user);
    });
});

export default passport;
export { ensureAuthenticated };
