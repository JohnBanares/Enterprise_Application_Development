const {Products} = require('../model/productsModel')

const  getProduct = async (req, res) => {
    const products = await Products.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

module.exports = {
    getProduct,
};