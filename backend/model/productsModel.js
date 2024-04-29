const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
   },
   id:{
        type: String,
        required: true
   },
   manufacturer: {
        type: String,
        required: true
   },
    type: {
        type:String,
    },
    price: {
        type:String,
        required: true
    },
    description: {
        type:String,
    }
})

const Products = mongoose.model('Products', productSchema);


module.exports = {Products};