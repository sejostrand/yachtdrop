import React, { useState } from 'react';
import styled from 'styled-components';

// IMPORT COMPONENTS
/* import NavLogo from './objects/NavLogo'; */
import NavAdmin from './objects/NavAdmin';
import MenuLink from './objects/MenuLink';
import LoginLink from './objects/LoginLink';
import ProfileLink from './objects/ProfileLink';
import SignUpLink from './objects/SignUpLink';
import YachtdropLogo from '@objects/YachtdropLogo';
import LogOutButton from '@objects/LogOutButton';
import DropDown from '../DropDownMenu/DropDown'
import useMediaQuery from '../DropDownMenu/useMediaQuery'

//import colors
import { COLORS } from '@assets/theme/theme';

const StyledNavBar = styled.nav`
  background-color: ${COLORS.green};
  padding: 5px 25px;
  width: 100%;
  justify-content: space-between;
  top: 0;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  z-index: 10;
  overflow: hidden;
  max-height: ${(props) => props.navHeight};
  transition: ease-in-out 0.2s;
`;

const NavMenu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-content: center;

  @media (max-width: 1140px) {
    visibility: hidden;
    position: absolute;
  }
`;

const NavBar = (props) => {
  const [navHeight, setNavHeight] = useState('none');
  const [scrollPos, setScrollPos] = useState();
  const matches = useMediaQuery('(min-width: 600px)')

  return (
    <StyledNavBar>
      <YachtdropLogo />
      {window.location.href != 'http://localhost:3000/' && (
        <NavMenu>
          <MenuLink href='/shoppage'>All</MenuLink>
          <MenuLink href='/shoppage/products?category.category=wine&'>
            Wine
          </MenuLink>
          <MenuLink href='/shoppage/products?category.category=spirit&'>
            Spirits
          </MenuLink>
          <MenuLink href='/shoppage/products?category.category=beer&'>
            Beer
          </MenuLink>
          <MenuLink href='/shoppage/products?category.category=soft-drink&'>
            Soft Drinks
          </MenuLink>
        </NavMenu>
      )}
      {matches ? (
      <NavAdmin>
        <LoginLink />
        <ProfileLink />
        <SignUpLink />
        <LogOutButton />
      </NavAdmin>) : <DropDown />}
    </StyledNavBar>
  );
};

export default NavBar;
