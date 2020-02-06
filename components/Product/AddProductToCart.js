import { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router';
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'

function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    let timeOut;
    if (success) {
      timeOut = setTimeout(() => setSuccess(false), 2000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [success])

  const handleAddProductToCart = async () => {
    try {
      setLoading(true);
      const payload = { quantity, productId };
      const url = `${baseUrl}/api/cart`
      const token = cookie.get('token');
      const header = { headers: { authorization: token } };
      await axios.put(url, payload, header);
      setSuccess(true);
    } catch (e) {
      catchErrors(e, window.alert)
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Input
      type='number'
      min='1'
      value={quantity}
      onChange={event => setQuantity(event.target.value)}
      placeholder="Enter Quantity"
      action={
        user && success ? {
          color: "blue",
          content: "Item Added!",
          icon: "plus cart",
          disabled: true
        } :
          user ? {
            color: "green",
            content: "Add to Cart",
            icon: "plus cart",
            loading,
            disabled: loading,
            onClick: handleAddProductToCart
          } : {
              color: "blue",
              content: "signup to purchase",
              icon: "signup",
              onClick: () => Router.push('/signup')
            }}
    />
  </>;
}

export default AddProductToCart;
