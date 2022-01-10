const path = require('path')
// console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
async function databaseFn(){
    const client = new MongoClient(URI);

    try{
        await client.connect();
        await updateDocumentByName(client, "tomato", "Tomato" );
        await updateDocumentByPrice(client, "Dry fruit", 450 );
        await updateDocuments(client, "Cut vegetables kit", "Cut vegetables Kit" );
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

async function updateDocumentByName(client, name, updatedname){
    const result = await client.db('test').collection('products').updateOne({name: name}, {$set:{ name: updatedname}});
    console.log(`Updated Count ${result.modifiedCount} : ${name} updated to ${updatedname}.`);
}

async function updateDocumentByPrice(client, name, updatedprice){
    const result = await client.db('test').collection('products').updateOne({name: name}, {$set:{ price: updatedprice}});
    console.log(`Updated Count ${result.modifiedCount} : Price of ${name} updated to ${updatedprice}.`);
}

async function updateDocuments(client, name, updatedName){
    const result = await client.db('test').collection('products').updateMany({name: name}, {$set:{ name: updatedName}});
    console.log(`Updated Count ${result.modifiedCount}`);
}



databaseFn().catch(console.error)