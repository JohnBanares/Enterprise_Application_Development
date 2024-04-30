const express = require('express')
const {
	getProduct,
	getSpecificProducts,
	insertProduct,
	deleteProducts,
	updateProducts,
}=require('../controller/productsController')
const router = express.Router()

router.get('/', getProduct)
router.get('/get-specific-products/:searchVal', getSpecificProducts)
router.post('/insert-product', insertProduct)
router.delete('/delete-products', deleteProducts)
router.put('/update-products', updateProducts)

  

module.exports = router