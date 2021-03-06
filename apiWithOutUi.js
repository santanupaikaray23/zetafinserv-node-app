const express = require('express');
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors())
let db;
let col_name="users"
const mongourl ="mongodb+srv://naturewithcode:nature123@cluster0.yf62c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
});

app.get('/users',(req,res)=>{
    db.collection(col_name).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.post('/addusers',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result)=>{
        if(err)throw err;
        res.send('Data Added')
    })
})

MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('zeta');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})