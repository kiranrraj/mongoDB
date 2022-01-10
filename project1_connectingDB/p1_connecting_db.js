const path = require('path')
// console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
async function databaseFn(){

    const client = new MongoClient(URI);

    try{
        await client.connect();
        await listDB(client);
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

async function listDB(client){
    let dbs = await client.db().admin().listDatabases();
    dbs.databases.forEach(db =>{
        console.log(`-${db.name}`)
    })
}

databaseFn().catch(console.error)