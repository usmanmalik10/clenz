const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    username:
    {
        type: String
    },
    adress: {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String,
        select: false,
        min: 8
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    favouritNews: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'newsFeeds',
        default:""
    }],
    // categories: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'newsFeeds'
    // }],
    otp:
    {
        type: String,
        default: "",
        select: false,
        createdAt: { type: Date, expires: '5m', default: Date.now }
    },
    verifiedUsers: {
        type: Boolean,
        default: false
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
});
//user Model
module.exports = mongoose.model('users', userSchema);

