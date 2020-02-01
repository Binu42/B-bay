import { Segment, Button, Divider } from 'semantic-ui-react'

function CartSummary() {
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub Total: </strong>₹ 0.00
      <Button
        icon='cart'
        color="green"
        content="Checkout"
        floated="right"
      />
    </Segment>
  </>;
}

export default CartSummary;
