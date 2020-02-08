import { Segment, Header, Accordion, Label, Icon, Button, List, Image } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function AccountOrders({ orders }) {
  const router = useRouter();

  const mapOrdersToPanels = (orders) => {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={order.createdAt} />
      },
      content: {
        content: (
          <>
            <List.Header as="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: '1em' }}
              />
            </List.Header>
            <List>
              {order.products.map(order => (
                <List.Item key={order.product._id}>
                  <Image avatar src={order.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{order.product.name}</List.Header>
                    <List.Description>
                      {order.quantity} .₹{order.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label
                      tag
                      color="red"
                      content={order.product.sku}
                      size="tiny"
                    />
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }))
  }
  return (<>
    <Header textAlign="center" as="h2">
      <Icon name="folder open" />
      Ordered List
    </Header>
    {
      orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            No Past Orders
          </Header>
          <div>
            <Button onClick={() => router.push('/')} color="orange">
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
          <Accordion
            fluid
            styled
            exclusive={false}
            panels={mapOrdersToPanels(orders)}
          />
        )
    }
  </>);
}

export default AccountOrders;
