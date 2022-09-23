const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');

dotenv.config();

require('./helpers/database').connect();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/review', reviewRoute);


app.listen(6080, ()=>{
    console.log(`server listening on port 6080`)
})
