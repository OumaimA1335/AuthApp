require('dotenv').config();
const express = require('express');
const app = express ();
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const authRoutes= require('./routes/auth');
const connection = require('./db');
const cross = require('cors');

//databaseConnection
connection();

//middlewares
app.use(cross());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/api/users",userRoutes);
app.use("/api/users",authRoutes);

const port = process.env.Port || 7070;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
