const express = require('express')
const {
  getProduct,
  getSpecificProducts
}=require('../controller/productsController')
const router = express.Router()

router.get('/', getProduct)
router.get('/get-specific-products/:searchVal', getSpecificProducts)
  

module.exports = router