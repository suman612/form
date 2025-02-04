const mongoose = require("mongoose");

// const mongoURL = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
// const mongoURL = "mongodb://127.0.0.1:27017/?directConnection=true"
const mongoURL = process.env.DB_URI

// mongodb+srv://sumantongariya:a1suman@01@registration.6zyor.mongodb.net/?retryWrites=true&w=majority&appName=Registration

const connectToMongo=()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log("Connected MongoDB");
    })
}

module.exports = connectToMongo;