

const path = require('path')
// console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

async function databaseFn(){
    const client = new MongoClient(URI);

    try{
        await client.connect();
        await deleteOneDocument(client, "Rice");
        await deleteOneDocument(client, "Cut vegetables Kit");
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

async function deleteOneDocument(client, name){
    const result = await client.db('test').collection('products').deleteOne({name: name});
    console.log(`Deleted Count ${result.deletedCount}.`);
}

async function deleteOneDocument(client, name){
    const result = await client.db('test').collection('products').deleteMany({name: name});
    console.log(`Deleted Count ${result.deletedCount}.`);
}


databaseFn().catch(console.error)