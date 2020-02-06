function calculateCartTotal(products) {
  // console.log(products)
  const total = products.reduce((acc, el) => {
    acc += el.quantity * el.product.price;
    console.log(acc, el)
    return acc;
  }, 0);
  // console.log(total)
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number(total * 100).toFixed(2);
  // console.log(cartTotal)
  return { cartTotal, stripeTotal };
}

export default calculateCartTotal;