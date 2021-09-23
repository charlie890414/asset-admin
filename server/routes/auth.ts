import express from 'express';
import passport from '../auth/passport.js';
import User from '../model/user.js';

const router = express.Router();

router.post('/regist', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password,
    });
    User.createUser(newUser, function (err: any, user: any) {
        if (err) return next(err);
        res.send('registed');
    });
});

router.post('/auth', function (req, res, next) {
    passport.authenticate('local', function (err: any, user: any) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        req.logIn(user, function (err: any) {
            if (err) {
                return next(err);
            }
            return res.send('authenticated');
        });
    })(req, res, next);
});

export default router;
