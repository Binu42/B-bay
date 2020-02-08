import Product from '../../models/Product'
import connectDB from '../../utils/connectDb';
import shortid from 'shortid'
import Cart from '../../models/Cart'


connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`method ${req.method} not allowed`);
  }
}

const handleGetRequest = async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).send(product);
}

const handleDeleteRequest = async (req, res) => {
  const { _id } = req.query;
  try {
    await Product.findOneAndDelete({ _id });
    await Cart.updateMany({ 'products.product': _id }, { $pull: { products: { product: _id } } });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(405).send('Error while Deleting producy');
  }
}



const handlePostRequest = async (req, res) => {
  const { name, description, mediaUrl, price } = req.body;
  console.log(name, description, mediaUrl, price)
  try {
    if (!name || !description || !mediaUrl || !price) {
      res.status(422).send('Missing one or more required Fields');
    }
    const sku = shortid.generate();
    const product = await new Product({
      name, description, mediaUrl, price, sku
    }).save();
    res.status(201).json(product)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while creating product');
  }
}
