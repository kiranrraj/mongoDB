const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const mongoose = require('mongoose')

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@cluster0.zxusy.mongodb.net/tasks?retryWrites=true&w=majority`;

mongoose.connect(URI,)