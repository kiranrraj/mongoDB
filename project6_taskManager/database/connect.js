const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@cluster0.zxusy.mongodb.net/${process.env.DB_DBNAME}?retryWrites=true&w=majority`;


const mongoose = require('mongoose')
const connectDB = () => {
    return mongoose.connect(URI)
    .then(()=>{
            console.log("Connected to the database");
    }).catch((err)=>{
            console.log(err);
    });
}

module.exports = connectDB;