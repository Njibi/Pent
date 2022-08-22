const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');

dotenv.config();

mongoose
    .connect(
    process.env.MONGO_URL
    )
    .then(()=>{
        console.log(`database running`)
    })
    .catch((error)=>{
        console.log(`failed to run database...`);
        console.error(error);
        process.exit(1)
})

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/review', reviewRoute);


app.listen(6080, ()=>{
    console.log(`server listening on port 8800`)
})