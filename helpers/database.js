const mongoose = require('mongoose')

exports.connect = () =>{

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

}