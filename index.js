require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const dbconnection = require('./Database');
const userRouter = require('./Routes/user');
const slots = require('./Routes/order')


const port = process.env.PORT



const app = express();
app.use(express.json());


// DataBase connection
dbconnection();


app.use('/user', userRouter);
app.use('/order', slots)

app.listen(port || 4000, () => {
    console.log('your server runing at:' + port);
});
