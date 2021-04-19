import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// IMPORT COMPONENTS
import NavBar from '@components/NavBar/NavBar';
import SearchBar from '@components/SearchBar/SearchBar';
import FilterBar from '@components/FilterBar/FilterBar.js';
import ProductGrid from '@components/ProductGrid/ProductGrid.js';
import CoverBar from '@components/CoverBar/CoverBar';
import BodyWrapper from '../../objects/BodyWrapper.js';
import BodyDiv from '../../objects/BodyDiv.js';
import SortBy from '@components/SortBy/SortBy.js';

import Footer from '../HomePage/components/Footer/Footer';

//IMPORT PRODUCTS FROM API
/* function getProducts() {
  axios({
    method: 'GET',
    url: 'https://yachtdrop.herokuapp.com/products',
    params: {
      featured: true,
    },
  })
    .then((res) => showProducts(res))
    .catch((err) => console.error(err));
}

function showProducts(res) {
  console.log(res.data);
} */



const StyledShopPage = styled.div``;




const ShopPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const productsFromServer = await fetchProducts()
      setProducts(productsFromServer)
    }
  
    getProduct()
  }, [])

// Fetch Products
const fetchProducts = async () => {
  const res = await fetch('https://yachtdrop.herokuapp.com/products')
  const data = await res.json()
  
  return data
  }

/*   getProducts();
 */  return (
    <StyledShopPage>
      <NavBar />
      <SearchBar />
      <BodyWrapper>
        <FilterBar />
        <BodyDiv>
          <CoverBar />
          <SortBy />
          <ProductGrid products={products} />
        </BodyDiv>
      </BodyWrapper>
      <Footer />
    </StyledShopPage>
  );
};

export default ShopPage;
