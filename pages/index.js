import React, { useEffect, useState } from 'react'
import axios from 'axios'



function Home() {

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const url = "http://localhost:3000/api/products";

    const response = await axios.get(url);
    setProducts(response.data);
  }

  const getProductItem = (product) => {
    return (
      <div>
        <div class="ui card">
          <div class="image">
            <img src={product.mediaUrl} />
          </div>
          <div class="content">
            <a class="header">Kristy</a>
            <div class="meta">
              <span class="date">Joined in 2013</span>
            </div>
            <div class="description">
              Kristy is an art director living in New York.
              </div>
          </div>
          <div class="extra content">
            <a>
              <i class="user icon"></i>
              22 Friends
              </a>
          </div>
        </div>
      </div>
    )
  }

  console.log(products)

  return (
    products.map(product => {
      console.log(getProductItem(product));
    })
  );
}

Home.getIntialProps = () => {

}

export default Home;
