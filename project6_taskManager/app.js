const connectDB = require('./database/connect');

const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/tasks');

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', router);


const connect = async () => {
    try{
        await connectDB();
        app.listen(port, ()=>{
            console.log(`Server running on port ${port}`);
        });
    }
    catch(err){
        console.error(err,"Error occured");
    }
}

connect();