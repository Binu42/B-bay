import { useEffect, useState } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeAmount);
    setIsEmpty(products.length === 0);
  }, [products])
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub Total: </strong>₹ {cartAmount}
      <Button
        icon='cart'
        color="green"
        content="Checkout"
        disabled={isEmpty}
        floated="right"
      />
    </Segment>
  </>;
}

export default CartSummary;
