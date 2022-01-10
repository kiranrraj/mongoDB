const path = require('path')
// console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const { mainModule } = require('process');
const { resourceLimits } = require('worker_threads');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;const doc1 = {
    name: "Orange",
    price: 120
}, doc2 = {
    name: "tomato",
    price: 65
}, doc3 = {
    name: "dry fruit",
    price: 300
}, doc4 = {
    name: "Banana",
    price: 30
},doc5 = {
    name: "Cheese",
    price: 220
}, doc6 = {
    name: "Bread",
    price: 45
}, doc7 = {
    name: "Rice",
    price: 30
}, doc8 = {
    name: "Ice Cream",
    price: 30
};


async function databaseFn(){

    const client = new MongoClient(URI);

    try{
        await client.connect();
        await addOneDocument(client, doc1);
        await addOneDocument(client, doc2);
        await addOneDocument(client, doc3);
        await addOneDocument(client, doc4);
        await addManyDocuments(client, [doc5, doc6, doc7, doc8]);
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

async function addOneDocument(client, document){
    const result = await client.db("test").collection("products").insertOne(document);
    console.log(`Document inserted with id ${result.insertedId}`);
}

async function addManyDocuments(client, documents){
    const result = await client.db("test").collection("products").insertMany(documents);
    console.log(`Inserted Documents : ${result.insertedCount}`);
}


databaseFn().catch(console.error)