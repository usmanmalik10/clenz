const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    service:
    {
        type: Array,
    },
    date:
    {
        type: Date
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
module.exports = mongoose.model('Order', orderSchema);

