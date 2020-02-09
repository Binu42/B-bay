import { useState } from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import cookies from 'js-cookie'
import catchErrors from '../utils/catchErrors'

function Cart({ products, user }) {
  // console.log(products)
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRemove = async (id) => {
    const token = cookies.get('token');
    // console.log(token)
    const url = `${baseUrl}/api/cart`;
    const payload = {
      params: { productId: id },
      headers: { authorization: token }
    }
    const response = await axios.delete(url, payload);
    setCartProducts(response.data);
  }

  const handleCheckout = async (paymentData) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`
      const payload = { paymentData }
      const token = cookies.get('token');
      const headers = { headers: { authorization: token } }
      const response = await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert)
    } finally {
      setLoading(false);
    }
  }

  return <Segment loading={loading}>
    <CartItemList handleRemove={handleRemove} products={cartProducts} user={user} success={success} />
    <CartSummary products={cartProducts} handleCheckout={handleCheckout} success={success} />
  </Segment>;
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  console.log("response", response)
  return { products: response.data };
}
export default Cart;
