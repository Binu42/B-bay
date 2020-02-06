import jwt from 'jsonwebtoken';
import moongoose from 'mongoose'
import Cart from '../../models/Cart'
import connectDb from '../../utils/connectDb'

connectDb();

export default async (req, res) => {
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