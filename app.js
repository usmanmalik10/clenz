require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser');

const dbconnection = require('./Database');
const userRouter = require('./Routes/user');
const order = require('./Routes/order');
// http://18.191.99.9

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
  })
);

app.use(express.json());

// DataBase connection
dbconnection();

app.use('/user', userRouter);
app.use('/order', order);

app.get('/', (req, res) => {
  res.json({
    message: 'this is get api from clenz',
  });
});

app.listen(port || 4000, () => {
  console.log('your server runing at:' + 4000);
});
