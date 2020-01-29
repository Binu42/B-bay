import { Card } from 'semantic-ui-react'

function ProductList({ products }) {
  const mapProductsToItems = (products) => {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      color: 'teal',
      meta: `$ ${product.price}`,
      fluid: true,
      childKey: product._id,
      href: `/play/${product._id}`
    }))
  }

  return <Card.Group stackable itemsPerRow='3' centered items={mapProductsToItems(products)} />;
}

export default ProductList;
