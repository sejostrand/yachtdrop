import styled from 'styled-components';
import { COLORS, FONTS } from '../../../assets/theme/theme';

export const TileWrapper = styled.div`
  padding: 5px;
  margin: 20px 10px;
  background-color: ${COLORS.color4};
  display: block;
  width: 160px;
  cursor: pointer;
  border-radius: 4px;
`;

export const PackSize = styled.div`
  float: left;
  position: absolute;
  background-color: ${COLORS.color1};
  color: ${COLORS.color5};
  border-radius: 4px;
  padding: 3px;
  font-size: 10px;
  font-weight: bold;
  font-family: ${FONTS.primaryFont};
  letter-spacing: 1px;

  /* if pack =1 then visibility: hidden */
`;

export const ProductImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const DetailsWrapper = styled.div`
  padding: 5px;
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: column wrap;
`;

export const ProductName = styled.div`
  font-size: 15px;
  width: 100%;
  flex-flow: row wrap;
  height: 1rem;
  overflow: hidden;
  margin: 1px;
`;

export const ProductDescription = styled.div`
  font-size: 14px;
  color: gray;
  width: 100%;
  height: 1rem;
  margin: 1px;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  width: 100%;
  height: 1rem;
  margin: 1px;
`;

export const AddButtonWrapper = styled.div`
  background-color: ${COLORS.color2};
  color: ${COLORS.color5};
  font-family: ${FONTS.secondaryFont};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  cursor: pointer;

  padding: 3px 0px;
  text-align: center;

  border-radius: 4px;
  width: 100%;
  height: auto;

  &:hover {
    opacity: 0.8;
  }
`;
