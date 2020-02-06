import { Segment } from 'semantic-ui-react'
import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'

function Cart({ products, user }) {
  // console.log(products)
  return <Segment>
    <CartItemList products={products} user={user} />
    <CartSummary products={products} />
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
