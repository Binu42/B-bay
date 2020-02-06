import { Segment, Header, Button, Icon } from 'semantic-ui-react'

function CartItemList({ user }) {
  return (
    <Segment inverted color="teal" secondary textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" />
        No Product in Your Cart!! Add Some
      </Header>
      <div>
        {user ? (
          <Button color='orange'>View Products</Button>
        ) : (
            <Button color="blue">Login To Add Products</Button>
          )}
      </div>
    </Segment>
  );
}

export default CartItemList;
