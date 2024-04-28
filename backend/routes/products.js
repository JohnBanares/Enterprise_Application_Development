const express = require('express')
const {
  getProduct
}=require('../controller/productsController')
const router = express.Router()

router.get('/', getProduct)
  

module.exports = router