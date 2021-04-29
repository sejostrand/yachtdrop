import { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';

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

const StyledShopPage = styled.div`
  background-color: white;
`;

const ShopPage = () => {
  // STATES
  const [products, setProducts] = useState([]);
  const [subProducts, setSubProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  const [filterButtonState, setFilterButtonState] = useState(['all']);
  const [sortButtonState, setSortButtonState] = useState(['popularity']);
  //const [sortState, setSortState] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([]);
  //const [objectVisibilityState, setobjectVisibilityState] = useState([]);

  // TOGGLES
  const [priceToggle, setPriceToggle] = useState([true]);
  const [alphaToggle, setAlphaToggle] = useState([true]);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:1337/products');
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const productsFromServer = await fetchProducts();
      setProducts(productsFromServer);
      setDefaultProducts(productsFromServer);
    };
    getProduct();
  }, []);

  //UseEffect for the search functionality
  useEffect(
    () => [
      setFilteredSearch(
        products.filter((product) => {
          return product.product_name
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        })
      ),
    ],
    [searchInput, products, subProducts]
  );

  // FILTERING

  const removeFilterProducts = (tag) => {
    setProducts(defaultProducts);
    setFilterButtonState(tag);
  };

  const toggleFilterProducts = (tag) => {
    const defaultFilteredData = defaultProducts.filter((product) =>
      product.categories.includes(tag)
    );
    setProducts(defaultFilteredData);
    setFilterButtonState(tag);
  };

  const addFilterProducts = (tag) => {
    const filteredData = products.filter((product) =>
      product.categories.includes(tag)
    );
    setProducts(filteredData);
  };

  // SORTING

  const sortPrice = (tag) => {
    if (priceToggle == true) {
      filteredSearch.sort((a, b) => a.product_price - b.product_price);
    } else {
      filteredSearch.sort((a, b) => b.product_price - a.product_price);
    }
    setPriceToggle(!priceToggle);
    setSortButtonState(tag);
  };

  const sortAlpha = (tag) => {
    if (alphaToggle == true) {
      filteredSearch.sort(function (a, b) {
        a = a.product_name.toLowerCase();
        b = b.product_name.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
      });
    } else {
      filteredSearch.sort(function (a, b) {
        a = a.product_name.toLowerCase();
        b = b.product_name.toLowerCase();

        return a > b ? -1 : a > b ? 1 : 0;
      });
    }
    setAlphaToggle(!alphaToggle);
    setSortButtonState(tag);
  };

  return (
    <StyledShopPage>
      <NavBar />
      <SearchBar setSearchInput={setSearchInput} />
      <BodyWrapper>
        <FilterBar
          toggleFilterProducts={toggleFilterProducts}
          addFilterProducts={addFilterProducts}
          removeFilterProducts={removeFilterProducts}
          filterButtonState={filterButtonState}
        />
        <BodyDiv>
          <CoverBar />
          <SortBy
            sortPrice={sortPrice}
            sortAlpha={sortAlpha}
            sortButtonState={sortButtonState}
          />
          <ProductGrid products={filteredSearch} />
        </BodyDiv>
      </BodyWrapper>
      <Footer />
    </StyledShopPage>
  );
};

export default ShopPage;
