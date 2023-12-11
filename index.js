require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7b7ma7m.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
      await client.connect();
      const db = client.db('products');
      const productCollection = db.collection('product');
  
      app.get('/category', async (req, res) => {
        const cursor = productCollection.find({});
        const products = await cursor.toArray();
        res.send({ products });
      });
      app.get('/category/:id', async (req, res) => {
        const id = req.params.id;
        const  products = await productCollection.findOne({ _id:new ObjectId(id) });
        res.send( products);
      });
      
    } finally {
      // Make sure to close the connection when done
    //   await client.close();
    }
  };
  

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});