const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    username:
    {
        type: String
    },
    service:
    {
        type: Array,
    },
    date:
    {
        type: Date
    },
    time: {
        type: String
    },
    price:{
        type: Number
    },
    status:
    {
        type: String,
    },
    venu:{
        type: String
    },
});
module.exports = mongoose.model('order', orderSchema);

