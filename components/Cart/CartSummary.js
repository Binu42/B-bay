import { useEffect, useState } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'
import StripeCheckout from 'react-stripe-checkout'

function CartSummary({ products, handleCheckout, success }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [stripeAmount, setStripeAmount] = useState(0);

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setIsEmpty(products.length === 0);
  }, [products])
  // console.log(cartAmount, stripeAmount)
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub Total: </strong>₹ {cartAmount}
      <StripeCheckout
        name="B-bay"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="INR"
        shippingAddress={true}
        stripeKey="pk_test_ynGaDvSvq24ZqzA0I1UgQVWk00O4uYfXxr"
        billingAddress={true}
        zipCode={true}
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button
          icon='cart'
          color="green"
          content="Checkout"
          disabled={isEmpty || success}
          floated="right"
        />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;
