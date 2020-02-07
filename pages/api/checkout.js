import Stripe from 'stripe'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import calculateCartTotal from '../../utils/calculateCartTotal'
import Order from '../../models/Order'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { paymentData } = req.body;
  // console.log(paymentData)
  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: 'products'
    });

    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);

    const previousCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1
    });
    console.log(previousCustomer);
    const isExistingCustomer = previousCustomer.data.length > 0;

    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id
      })
    }

    const customer = (isExistingCustomer && previousCustomer.data[0].id) || newCustomer.id;

    const charge = await stripe.charges.create({
      currency: "INR",
      amount: stripeTotal,
      receipt_email: paymentData.email,
      customer,
      description: `checkout | ${paymentData.email} | ${paymentData.id}`
    }, {
      idempotency_key: uuidv4()
    });

    await new Order({
      user: userId,
      email: paymentData.email,
      products: cart.products,
      total: cartTotal
    }).save();

    await Cart.findOneAndUpdate({
      _id: cart._id
    }, {
      $set: { products: [] }
    })

    res.status(200).send('checkedOut successfully');
    // console.log(paymentData);-
  } catch (err) {
    console.log(err);
    res.status(404).send('Error processing charge');
  }
}