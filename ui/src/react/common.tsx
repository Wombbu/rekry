import styled from 'styled-components';

const darkFont: string = 'rgb(68,68,68)';
const greyBg: string = 'rgb(245,245,245)';
const red: string = 'rgb(236,76,80)';
const darkerRed: string = 'rgb(216,56,60)';

export const TopBar = styled.div`
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 1px rgba(100,100,100,0.4);
  justify-content: center;
  z-index: 100;
  position: relative;
`;

const Card = styled.div`
  box-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  border-radius: 3px;
  padding: 10px 10px 0px 10px;
  background-color: white;
  margin-bottom: 7px;
  margin-top: 5px;
`

export const Font = styled.span`
  font-size: ${(p: {size: number, color?: string}) => `${p.size}px`};
  ${(p: {size: number, color?: string}) => p.color ? `color: ${p.color};` : ''};
`;

export const SaskenLogo = styled.div`
  min-height: 26px;
  min-width: 22px;
  background-image: url(./sasken-hex.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 15px;
`

export default {
  SaskenLogo,
  darkerRed,
  greyBg,
  red,
  darkFont,
  TopBar,
  Card,
  Font
}
