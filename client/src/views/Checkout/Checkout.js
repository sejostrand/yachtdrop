import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '@assets/utils/CartContext';
import { COLORS } from '@assets/theme/theme';
import useMediaQuery from '@assets/utils/useMediaQuery';
import ListItem from './objects/ListItem';
import COVER from '@assets/img/cover-narrow.jpg';
import axios from 'axios';
import { useCurrentUser } from '@assets/utils/CurrentUser';

const BodyWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background: ${COLORS.white};
  background-image: url(${COVER});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: min(55vh, 35vw);
  width: 100%;
  padding: 0 8vw;
  background-color: ${COLORS.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  min-height: 80vh;
  box-shadow: 0px -1px 50px ${COLORS.darkGray};
`;

const RowContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 50px auto 10px 10px;
  font-size: 30px;
  font-weight: 400;
`;

const ConfirmButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  background-color: ${COLORS.orange};
  color: white;
  font-size: 20px;
  border-radius: 5px;
  padding: 10px 25px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  transform: none;
  margin: 20px 15px 10px auto;
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  max-width: 600px;
  background-color: ${COLORS.green};
  border-radius: 10px;
  margin: 0 auto 50px auto;
`;

const OrderForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin: 10px;
`;

const FieldLabel = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin: 5px 0px;
`;

const InputField = styled.input`
  width: 95%;
  padding: 3px;
`;

const CartContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 900px;
  margin: 30px auto 60px auto;
`;

const ReturnButton = styled.a`
  display: flex;
  flex-flow: row nowrap;
  background-color: ${COLORS.orange};
  color: white;
  width: fit-content;
  height: fit-content;
  font-size: 20px;
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  text-decoration: none;
  margin: 25px 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const CartHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 10px 20px;
`;

const Total = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 20px;
`;

const CartDivider = styled.div`
  display: flex;
  height: 1px;
  margin: 8px 20px;
  background-color: ${COLORS.lightGray};
`;

const Paragrapgh = styled.p`
  margin: 10px;
`;

const CheckOut = () => {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const mediaQuery = useMediaQuery('(min-width: 600px)');
  const user = useCurrentUser();

  const [vessel, setVessel] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  // const [value, onChange] = useState(new Date());
  const [redirect, setRedirect] = useState(false);

  const getItems = () => {
    let result = {};
    cart.forEach((product) => (result[product.id] = product.qty));
    return result;
  };

  const POSTbody = () => {
    return {
      expectedDelivery: '2021-06-10T17:55:14.099Z',
      usersPermissionsUser: user.id,
      location: location,
      vesselName: vessel,
      productList: getItems(),
      contact: contact,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:1337/orders', POSTbody(), {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (redirect == true) {
      window.location.assign('/profile/orders');
    }
  }, [redirect]);

  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <BodyWrapper>
      {/* <BackgroundCover /> */}
      <BodyContainer>
        <ColumnContainer>
          <Title>Order confirmation</Title>
          {/* <Cover src={COVER} /> */}
          <Paragrapgh>
            Please check your cart and fill out the details to confirm your
            order and proceed to payment.
          </Paragrapgh>
        </ColumnContainer>

        <RowContainer>
          <ReturnButton href='/shoppage'>
            ◀ Return and continue shopping
          </ReturnButton>
        </RowContainer>

        <CartContainer>
          <RowContainer>
            <CartHeader>My order list</CartHeader>
            <Total> Total: &nbsp;&nbsp; € {totalPrice.toFixed(2)}</Total>
          </RowContainer>
          {cart.map((product, index) => (
            <>
              <CartDivider />
              <ListItem
                qty={product.qty}
                key={index}
                id={product.id}
                fullDescription={product.fullDescription}
                display={product.display}
                subDisplay={product.subDisplay}
                price={product.price}
                packSize={product.packSize}
                imgUrl={product.imgUrl}
              />
            </>
          ))}
        </CartContainer>

        <FormContainer>
          <OrderForm action={'/signup'} method={'POST'} onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Vessel Name: </FieldLabel>
              <InputField
                type='text'
                value={vessel}
                onChange={(e) => setVessel(e.target.value)}
              ></InputField>
            </Field>
            <Field>
              <FieldLabel>Reciever Name:</FieldLabel>
              <InputField
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></InputField>
            </Field>
            <Field>
              <FieldLabel>Contact Number:</FieldLabel>
              <InputField
                type='text'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></InputField>
            </Field>
            <Field>
              <FieldLabel>Location: </FieldLabel>
              <InputField
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></InputField>
            </Field>
            <Field>
              <FieldLabel>Datetime:</FieldLabel>
              <InputField
                type='text'
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              ></InputField>
              {/* <div>
                  <DateTimePicker onChange={onChange} value={value} />
                </div> */}
            </Field>
            <ConfirmButton type='submit' value='place-order'>
              Confirm & continue to payment
            </ConfirmButton>
          </OrderForm>
        </FormContainer>
      </BodyContainer>
    </BodyWrapper>
  );
};

export default CheckOut;
