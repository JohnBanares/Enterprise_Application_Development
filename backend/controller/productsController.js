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
    	console.error('Error fetching products:', error);
    	res.status(500).json({ error: 'Internal Server Error' });
	}	
}

const insertProduct = async (req, res) => {
    const {name, id ,manufacturer, price} = req.body
    // console.log({username, rating, description});
    try {
		const product = await Products.create({name: name, id: id,  manufacturer: manufacturer, price: price});
		res.status(200).json(product) ;
    } catch (error) {
		console.error('Error creating review:', error);
		res.status(400).json({error: error.message});
    }
}

const deleteProducts = async (req, res) => {
	const { deleteList } = req.body;
	
	try {
    	const products = await Products.deleteMany({ id: { $in: deleteList} });
  
    	res.status(200).json(products);
    } catch (error) {
    	console.error('Error deleting many:', error);
    	res.status(500).json({ error: 'Internal Server Error' });
	}	

}

const updateProducts = async (req, res) => {
	const { _id, name, id, manufacturer, price } = req.body;
	
	Products.findOneAndUpdate({ _id }, { name, id, manufacturer, price })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Product updated successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    })
	
}


module.exports = {
    getProduct,
    getSpecificProducts,
	insertProduct,
	deleteProducts,
	updateProducts,
};