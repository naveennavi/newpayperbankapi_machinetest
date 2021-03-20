const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const port = 3000;

const db = require('./config/database');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.send('Server connect successfully');
});

// call router
require('./routes/customer.route')(app);

app.listen(port,()=>{
    console.log('server runing with '+port+' port');
})