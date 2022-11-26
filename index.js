const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l5x6aei.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('hotSale').collection('productCollection');
        const categoryCollection = client.db('hotSale').collection('categoryCollection');
        const userCollection = client.db('hotSale').collection('userCollection');

        app.get('/categoryCollection', async (req, res) => {

            const query = {};
            const options = await categoryCollection.find(query).toArray();
            res.send(options);
        });

        app.get('/category/:id',async (req, res) => {
          const id = req.params.id;
          const query = {  category_id: id};
          const category_product = await productCollection.find(query).toArray();
          res.send(category_product);
        })
        app.get('/product', async (req, res) => {
            const query = {};
            const product = await productCollection.find(query).toArray();
            res.send(product);
        });


        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '5d' })
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
        });



        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
         })


    }
    finally {

    }
}
run().catch(console.log);





app.get('/', (req, res) => {
    res.send('resell server response');
});

app.get('/categoryCollection', (req, res) => {
    res.send();
});




app.listen(PORT, () => console.log(`resell server running ${PORT}`));
