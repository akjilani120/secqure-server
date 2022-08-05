const express = require('express')
const app = express()
const port =process.env.PORT || 5000

const cors = require('cors');

require('dotenv').config()
const corsConfig = {
    origin: true,
    credentials: true,
}
// Middle ware
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://akjilani:UKFw3nbDlCXJRSy9@cluster0.ehvoh0g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  
  try {
    await client.connect();
    const collection = client.db("user").collection("userData");
    app.post("/user" , async (req , res) =>{
      const user = req.body      
      
      const result = await collection.insertOne(user)      
      res.send(result)   
    })
    app.get("/users" , async(req , res) =>{
      const result = await collection.find().toArray()
      res.send(result)
     })
  }finally{

  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Secqure Company')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})