const path = require('path')
// console.log(path.resolve(__dirname, '../.env'));
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const {MongoClient} = require('mongodb');
const { mainModule } = require('process');
const { resourceLimits } = require('worker_threads');
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxusy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
async function databaseFn(){
    const client = new MongoClient(URI);

    try{
        await client.connect();
        await findOneDocument(client, 'tomato');
        let price = 100;
        await findDocuments(client, price);
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

async function findOneDocument(client, productName){
    const result =  await client.db("test").collection("products").findOne({name:productName});
    if(result){
        console.log(`Product name with "${productName}" found`);
    }else{
        console.log(`No product with the name ${productName} found`);
    }
}

async function findDocuments(client, conditionValue){
    const result =  await client.db("test").collection("products").find({price:{ $gte: conditionValue}});
    const resultArray = await result.toArray();
    console.log(resultArray);
    if(resultArray.length > 0){
        resultArray.forEach(doc=>{
            console.log(`Product: ${doc.name}  Price: ${doc.price}`);
        });
        
    }
}

databaseFn().catch(console.error)