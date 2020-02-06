import { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router';
import axios from 'axios'
import cookie from 'js-cookie'
import { baseUrl } from '../../utils/baseUrl'

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1);
  const Router = useRouter();

  const handleAddProductToCart = () => {
    const payload = { quantity, productId };
    const url = `${baseUrl}/api/cart`
    const token = cookie.get('token');
    const header = { headers: { authorization: token } };
    const response = axios.put(url, payload, header);
  }
  return <>
    <Input
      type='number'
      min='1'
      value={quantity}
      onChange={event => setQuantity(event.target.value)}
      placeholder="Enter Quantity"
      action={user ? {
        color: "green",
        content: "Add to Cart",
        icon: "plus cart",
        onClick: handleAddProductToCart
      } : {
          color: "blue",
          content: "signup to purchase",
          icon: "signup",
          onClick: () => Router.push('/signup')
        }}
    />

    {/* <Input
      type="number"
      min='1'
      icon='plus cart'
      iconPosition='left'
      label={{ tag: true, content: 'Add to Cart', color: 'green' }}
      labelPosition='right'

      placeholder='Enter Quantity'
    /> */}
  </>;
}

export default AddProductToCart;
