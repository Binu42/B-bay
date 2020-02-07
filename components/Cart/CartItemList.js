import { Segment, Header, Button, Icon, Item } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function CartItemList({ products, user, handleRemove }) {
  const Router = useRouter();
  const mapCartProductsToItems = (products) => {
    return products.map(item => ({
      childKey: item.product._id,
      header: (
        <Item.Header as="a" onClick={() => Router.push(`/product?_id=${item.product._id}`)}>
          {item.product.name}
        </Item.Header>
      ),
      image: item.product.mediaUrl,
      meta: `${item.quantity} x ₹${item.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemove(item.product._id)}
        />
      )
    }));
  }
  if (products.length === 0) {
    return (
      <Segment inverted color="teal" secondary textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No Product in Your Cart!! Add Some
        </Header>
        <div>
          {user ? (
            <Button color='orange' onClick={() => Router.push('/')}>View Products</Button>
          ) : (
              <Button color="blue" onClick={() => Router.push('/login')}>Login To Add Products</Button>
            )}
        </div>
      </Segment>
    );
  }

  return <Item.Group divided items={mapCartProductsToItems(products)} />
}

export default CartItemList;
