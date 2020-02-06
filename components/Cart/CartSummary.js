import { useEffect, useState } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'

function CartSummary({ products }) {

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(products.length === 0);
  }, [products])
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub Total: </strong>₹ 0.00
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
