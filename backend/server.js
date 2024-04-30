const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const productsRoutes = require('./routes/products')


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



mongoose.connect('mongodb+srv://john:enterprise@cluster0.uthkk7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});
  
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas: ', err);
});
//port
app.listen(3003, () =>{
    console.log('listening on port 3003')
})