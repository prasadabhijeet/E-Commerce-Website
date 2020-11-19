const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roles = Object.freeze({
    ADMIN: 'Admin',
    SELLER: 'Seller',
    BUYER: 'Buyer'
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    birthDate: Date,
    role: {
        type: String,
        enum : Object.values(Roles),
        default: Roles.BUYER
    },
    isApprovedUser: Number,
    points: Number

});

Object.assign(userSchema.statics, {
    Roles,
});

userSchema.statics.addUser = function(user){

    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    user.isApprovedUser = user.role == Roles.SELLER ? 0 : 1;

    return this.create(user);

}

userSchema.statics.isValidAddUser = function(userparam){
    const user = this.findOne({ username: userparam.username });
    if(user) return false;

    return true;
}

module.exports = mongoose.model('User', userSchema);