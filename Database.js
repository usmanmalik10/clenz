require('dotenv').config();
const mongoose = require("mongoose");


const dbconnection = (req, res) => {
    try {
        mongoose.connect(process.env.DB_CONNECTION,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Data Base connection successfull...');
    } catch (error) {
        console.log('Something wrong database connection Failed... ');
    }
}
module.exports = dbconnection;