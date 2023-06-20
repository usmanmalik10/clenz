const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    username:
    {
        type: String,
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
    role:{
        type: String,
        default: "user"
    },
    token:{
        type: String
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
});
//user Model
module.exports = mongoose.model('User', userSchema);

