require('dotenv').config();
const mongoose = require("mongoose");


const dbconnection = (req, res) => {
    try {
        mongoose.connect("mongodb+srv://huzairmehmood110:qOdlK2JvkXLV7f0h@cluster0.s0hmmxb.mongodb.net/salon?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Data Base connection successfull...');
    } catch (error) {
        console.log('Something wrong database connection Failed... ');
    }
}
module.exports = dbconnection;