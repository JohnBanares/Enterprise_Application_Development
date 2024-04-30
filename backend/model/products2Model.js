const mongoose = require('mongoose');

// Define the schema for the Product2 model
const product2Schema = new mongoose.Schema({
    name: String,
    id: String,
    manufacturer: String,
    price: Number
});

// Create the Product2 model
const Product2 = mongoose.model('Product2', product2Schema);

module.exports = Product2;
