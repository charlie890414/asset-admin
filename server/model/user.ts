import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

const User = mongoose.model('user', userSchema);

User.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

User.getUserByEmail = function (email) {
    const query = { email: email };
    return User.findOne(query).exec();
};

User.getUserById = function (id, callback) {
    User.findById(id, callback);
};

User.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

export default User;
