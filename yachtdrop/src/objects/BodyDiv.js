import React from 'react';
import styled from 'styled-components';

const StyledBodyDiv = styled.div`
  width: calc(100% - 200px);
  display: block;
`;

const BodyDiv = ({ children }) => {
  return <StyledBodyDiv>{children}</StyledBodyDiv>;
};

export default BodyDiv;
