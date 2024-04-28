const {Products} = require('../model/productsModel')

const  getProduct = async (req, res) => {
    const products = await Products.find({}).sort({createdAt: -1})
    res.status(200).json(products)
}

const getSpecificProducts = async (req, res) => {
    const { searchVal } = req.params;
  
    try {
      const products = await Products.find({ manufacturer: searchVal });
  
      if (!products) {
        return res.status(404).json({ error: 'No such products' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
module.exports = {
    getProduct,
    getSpecificProducts,
};