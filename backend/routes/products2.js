const express = require('express')
const {
	getSpecificProducts2,
	insertProduct2,
	deleteProducts2,
	updateProducts2,
}=require('../controller/products2Controller')
const router = express.Router()

router.get('/get-specific-products2/:searchVal', getSpecificProducts2)
router.post('/insert-product2', insertProduct2)
router.delete('/delete-products2', deleteProducts2)
router.put('/update-products2', updateProducts2)

  

module.exports = router