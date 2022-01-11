const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net`;

async function databaseFn(){

    const client = new MongoClient(URI);

    try{
        await client.connect();
        console.log("Connected to server")
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

databaseFn().catch(console.error)