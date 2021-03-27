import { useState } from 'react';
import styled from 'styled-components';

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

const StyledShopPage = styled.div``;

const ShopPage = () => {
  return (
    <StyledShopPage>
      <NavBar />
      <SearchBar />
      <BodyWrapper>
        <FilterBar />
        <BodyDiv>
          <CoverBar />
          <SortBy />
          <ProductGrid />
        </BodyDiv>
      </BodyWrapper>
      <Footer />
    </StyledShopPage>
  );
};

export default ShopPage;
