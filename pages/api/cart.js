import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "PUT":
      await handlePutReq(req, res);
      break;
    case "DELETE":
      await handleDeleteReq(req, res);
      break;
    default:
      res.status(405).send(`method ${req.method} is not allowed`)
  }
}

const handleGetReq = async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('NO Authorization token');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log(userId)
    const cart = await Cart.findOne({ user: userId }).populate({ path: "products.product", model: 'products' });
    // console.log(cart.products);
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send('Login Again!')
  }
}

const handlePutReq = async (req, res) => {
  const { quantity, productId } = req.body;
  if (!('authorization' in req.headers)) {
    return res.status(401).send('NO Authorization token');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ user: userId });
    const productExist = cart.products.some(doc => ObjectId(productId).equals(doc.product));
    if (productExist) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } })
    } else {
      const newProduct = { quantity, product: productId };
      await Cart.findByIdAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } }
      )
    }
    res.status(200).send('cart updated');
  } catch (error) {
    console.error(error);
    res.status(403).send('Login Again!')
  }
}

const handleDeleteReq = async (req, res) => {
  const { productId } = req.query;
  // console.log(req.query, req.headers)
  if (!('authorization' in req.headers)) {
    return res.status(401).send('NO Authorization token');
  }
  try {
    // console.log(req.headers.authorization)
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log(userId)
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "products"
    })
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send('Login Again!')
  }
}