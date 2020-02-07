import { useState } from 'react'
import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import cookies from 'js-cookie'

function Cart({ products, user }) {
  // console.log(products)
  const [cartProducts, setCartProducts] = useState(products);
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
  return <Segment>
    <CartItemList handleRemove={handleRemove} products={cartProducts} user={user} />
    <CartSummary products={cartProducts} />
  </Segment>;
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  try {
    const url = `${baseUrl}/api/cart`;
    const payload = { headers: { authorization: token } };
    const response = await axios.get(url, payload);
    return { products: response.data };
  } catch (error) {
    console.error(error);
  }
}
export default Cart;
