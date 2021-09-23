import mongoose from 'mongoose';
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, index: true },
        password: { type: String, required: true },
        activeCrawler: [String],
    },
    {
        timestamps: true,
    }
);

interface IUser {
    [key: string]: any;
}

const User: IUser = mongoose.model('user', userSchema);

User.createUser = function (newUser: { password: any; save: (arg0: any) => void; }, callback: any) {
    bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(newUser.password, salt, function (err: any, hash: any) {
            if (err) {
                console.log(err);
                return;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

User.getUserByEmail = function (email: any) {
    const query = { email: email };
    return User.findOne(query).exec();
};

User.getUserById = function (id: any, callback: any) {
    User.findById(id, callback);
};

User.comparePassword = function (candidatePassword: any, hash: any, callback: (arg0: null, arg1: any) => void) {
    bcrypt.compare(candidatePassword, hash, function (err: any, isMatch: any) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

export default User;
