import { Input } from 'semantic-ui-react'

function AddProductToCart() {
  return <>
    <Input
      type='number'
      min='1'
      value='1'
      placeholder="Enter Quantity"
      action={{
        color: "green",
        content: "Add to Cart",
        icon: "plus cart"
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
