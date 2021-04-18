import React from 'react';
import styled from 'styled-components';

// IMPORT COMPONENTS
import Header from './components/Header/Header'
import HomePageMain from './components/HomePageMain'
import Footer from './components/Footer/Footer'

import HeaderIcon from './img/sea.jpg'


const HomePage = () => {
  return (
    <>
      <Header image={HeaderIcon} />
      <HomePageMain />
      <Footer />
    </>
  );
};

export default HomePage;