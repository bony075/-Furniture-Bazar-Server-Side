const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get('/categoryCollection', async (req, res) => {

            const query = {};
            const options = await categoryCollection.find(query).toArray();
            res.send(options);
        });

        app.get('/category/:id',async (req, res) => {
            const id = req.params.id;
            // const query = { };
            const category_product = await productCollection.find({}, { category_id: id }).toArray();
            res.send(category_product);

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
