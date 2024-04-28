const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    mame: {
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
        required: true
    },
    price: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    }
})

const Products = mongoose.model('Products', productSchema);


module.exports = {Products};