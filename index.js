require('dotenv').config();
const express = require('express');
var cors = require('cors')
const bodyparser = require('body-parser');

const dbconnection = require('./Database');
const userRouter = require('./Routes/user');
const order = require('./Routes/order')


const port = process.env.PORT


const app = express();
app.use(cors({
    origin: '*',
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*'
  }));

app.use(express.json());


// DataBase connection
dbconnection();


app.use('/user', userRouter);
app.use('/order', order)

app.listen(port || 4000, () => {
    console.log('your server runing at:' + 4000);
});
