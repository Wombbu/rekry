import styled, {keyframes} from 'styled-components';
import * as ReactRedux from 'react-redux';
import * as React from 'react';
import {State} from '../redux';
import './load-pulse.css';
import c from './common';
import {FaHeart, FaRotateLeft, FaTimesCircle, FaStar } from 'react-icons/lib/fa';



const fadeIn = keyframes`
  from { opacity: 0; transform: rotate(-5deg) translate(-200px);}
  to { opacity: 1; transform: rotate(0deg) translate(0px); }
`

const CenteringWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  flex: 1;
`;

interface SwipePageProps {
  loading: boolean;
}

const AppearingCard = c.Card.extend`
  animation: ${fadeIn} 0.7s;
  min-height: 340px;
  min-width: 250px;
  background-image: url(./blurred-image.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  padding: 0px;
  margin-bottom: 0px;
  overflow: hidden;
`

const BottomInfo = styled.div`
  height: 180px;
  box-shadow: inset 0 -100px 100px -50px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  > ${c.Font} {
    text-shadow: 1px 1px rgba(0,0,0,0.4);
  }
`;

const BallContainer = styled.div`
  min-height: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 14px;
`

const AppearingBall = styled.div`
  min-width: ${(p: {size: number}) => p.size}px;
  min-height: ${(p: {size: number}) => p.size}px;
  border-radius: 50%;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwipePage = (props: SwipePageProps) =>
<React.Fragment>
  <c.TopBar> 
    <c.Font size={15} color={c.darkFont}> Swipe away </c.Font> 
  </c.TopBar>
  {props.loading && <CenteringWrapper> <div className="load"/> </CenteringWrapper>}
  {!props.loading && 
    <CenteringWrapper>
      <AppearingCard>
        <img src='./sasken-logo-white.png' style={{width: '142px', height: '58px', alignSelf: 'center'}} />
        <BottomInfo> 
          <c.Font color='white' size={15}> Sasken, 28 </c.Font>
          <c.Font color='white' size={10}> Damn good place to work </c.Font>
          <c.Font color='white' size={10}> Hermia </c.Font>
        </BottomInfo>
      </AppearingCard>
    </CenteringWrapper>}

    <BallContainer>
      <AppearingBall size={40}> <FaTimesCircle size={20} color='rgb(253,62,111)' /> </AppearingBall> 
      <AppearingBall size={30}> <FaRotateLeft color='rgb(255,187,4)' /> </AppearingBall> 
      <AppearingBall size={30}> <FaStar color='rgb(39,181,55)' /> </AppearingBall> 
      <AppearingBall size={40}> <FaHeart size={20} color='rgb(66,234,96)' /> </AppearingBall> 
    </BallContainer>
</React.Fragment>;

const mapStateToProps = (state: State) => ({
  loading: state.loading
} as SwipePageProps);

const mapDispatchToProps = (dispatch: any) => ({

});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SwipePage);

