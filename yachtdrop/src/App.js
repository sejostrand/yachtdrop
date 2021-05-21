import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import History from '@components/History';

//import GlobalStyles from './styles/global';

//COMPONENTS
import NavBar from '@components/NavBar/NavBar';
import Footer from '@components/Footer/Footer';

import ShopPage from './views/ShopPage/ShopPage';
import HomePage from './views/HomePage/HomePage';
import AboutUs from './views/AboutUs/AboutUs';
import ContactUs from './views/ContactUs/ContactUs';
import Embassador from './views/Embassador/Embassador';
import SignUp from './views/SignUp/SignUp';
import LogIn from './views/LogIn/LogIn';
import NewLogIn from '@views/LogIn/NewLogIn';
import Profile from '@views/Profile/Profile';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: auto;
`;

function App() {
  return (
    <AppWrapper>
      <NavBar />
      <Router history={History}>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/shoppage'>
            <ShopPage />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <LogIn />
          </Route>
          <Route path='/newlogin'>
            <NewLogIn />
          </Route>
          <Route path='/aboutus'>
            <AboutUs />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/contactus'>
            <ContactUs />
          </Route>
          <Route path='/embassador'>
            <Embassador />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </AppWrapper>
  );
}
export default App;
