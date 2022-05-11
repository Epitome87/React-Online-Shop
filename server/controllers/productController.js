import products from '../products.js';



const getProducts = async (req, res) => {
    res.send(products);
}


const getProduct = async (req, res) => {
    const { id : productID } = req.params;
    const product = products.find(product => product._id === productID);
    res.send(product);
}

export { getProducts, getProduct };