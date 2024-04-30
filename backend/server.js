const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const productsRoutes = require('./routes/products')
const productsRoutes2 = require('./routes/products2')

const fs = require('fs')
const Product2 = require('./model/products2Model'); 


const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

console.log(data)


const app = express()


app.use(express.json())
app.use(express.static(path.join(__dirname, 'about')));

app.use(cors());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// send over about.hrml content, this is fetched from the about folder stored in this folder
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about', 'about.html'));
});

app.use('/api/products', productsRoutes)
app.use('/api/products2', productsRoutes2)




mongoose.connect('mongodb+srv://john:enterprise@cluster0.uthkk7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

mongoose.connection.on('connected', async() => {
    console.log('Connected to MongoDB Atlas');

    try {

        const existingProducts = await Product2.find({});
        if (existingProducts.length === 0) {
        const data = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
        const productsToInsert = data.map(product => ({
            name: product.name,
            id: product.sku,
            price: product.price,
            manufacturer: product.manufacturer 
        }));
        await Product2.insertMany(productsToInsert);
        console.log('Products loaded into the database.');
        } else {
            console.log('Products already exist in the database.');
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
});
  
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas: ', err);
});
//port
app.listen(3003, () =>{
    console.log('listening on port 3003')
})