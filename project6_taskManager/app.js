const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/tasks')

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Task manager");
});

app.use('/api/v1/tasks', router)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});