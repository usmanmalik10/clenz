require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const dbconnection = require('./database');
const userRouter = require('./Routes/user');
const newsrouter = require('./Routes/newsfeeds');


const port = process.env.PORT



const app = express();
app.use(express.json());


// DataBase connection
dbconnection();

app.use('/api/auth', userRouter);
app.use('/api/feeds', newsrouter);

app.listen(port || 4000, () => {
    console.log('your server runing at:' + port);
});
