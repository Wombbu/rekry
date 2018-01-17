import styled, {keyframes} from 'styled-components';
import * as ReactRedux from 'react-redux';
import * as React from 'react';
import {State, getResult, setInitialState} from '../redux';
import './load-pulse.css';
import c from './common';
import {FaHeart, FaRotateLeft, FaTimesCircle, FaStar } from 'react-icons/lib/fa';

const slideIn = keyframes`
  from { opacity: 0; transform: rotate(-5deg) translate(-200px);}
  to { opacity: 1; transform: rotate(0deg) translate(0px); }
`;

const slideOut = keyframes`
  from { transform: rotate(0deg) translate(0);}
  to { transform: rotate(5deg) translate(300px); }
`;

/*const fadeIn = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`*/

const SwipePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  position: relative;
  ${(p: {resultShown: boolean}) => p.resultShown ? 'filter: blur(7px);' : ''}
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
  loadingResult: boolean;
  getResult: () => void;
  isMatch: boolean;
  showResult: boolean;
  setInitialState: () => void;
}

const AppearingCard = c.Card.extend`
  animation: ${(p: {present: boolean}) => p.present ? slideIn : slideOut} 0.7s forwards;
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
`;

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
`;

const AppearingBall = styled.div`
  min-width: ${(p: {size: number}) => p.size}px;
  min-height: ${(p: {size: number}) => p.size}px;
  border-radius: 50%;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ddd;
  }
`;

/*const Fade = styled.span`
  animation: ${fadeIn} 0.5s;
`*/

const ResultPopup = styled.div`
  background-color: rgba(0,0,10,0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItsAMatchText = styled.span`
  font-family: 'Sedgwick Ave', cursive;
  color: white;
  font-size: 36px;
  margin-bottom: 10px;
`
const InfoText = styled.span`
  font-family: 'Quicksand', sans-serif;
  font-weight: lighter;
  color: white;
  font-size: 13px;
  margin: 2px;
`;

const Button = styled.div`
  min-width: 240px;
  min-height: 35px;
  border: 1px solid white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0,0.3);
  }
  &:active {
    background-color: rgba(0,0,0,0.4);
  }
`;

export const SwipePage = (props: SwipePageProps) =>
<React.Fragment>
<SwipePageWrapper
  resultShown={props.showResult}
>
  <c.TopBar> 
    <c.Font size={15} color={c.darkFont}> Swipe away </c.Font> 
  </c.TopBar>
  {props.loading && <CenteringWrapper> <div className="load"/> </CenteringWrapper>}
  {!props.loading && 
    <CenteringWrapper
      onMouseDown={() => props.getResult()}
    >
      <AppearingCard
        present={!props.loadingResult}
      >
        <img src='./sasken-logo-white.png' style={{width: '142px', height: '58px', alignSelf: 'center'}} />
        <BottomInfo> 
          <c.Font color='white' size={15}> Sasken, 28 </c.Font>
          <c.Font color='white' size={10}> Damn good place to work </c.Font>
          <c.Font color='white' size={10}> Hermia </c.Font>
        </BottomInfo>
      </AppearingCard>
    </CenteringWrapper>}

    <BallContainer>
      <AppearingBall size={40}> <FaTimesCircle style={{marginTop: '1px', marginRight: '1px'}} size={20} color='rgb(253,62,111)' /> </AppearingBall> 
      <AppearingBall size={30}> <FaRotateLeft color='rgb(255,187,4)' /> </AppearingBall> 
      <AppearingBall size={30}> <FaStar color='rgb(39,181,55)' /> </AppearingBall> 
      <AppearingBall size={40} onClick={() => props.getResult()}> <FaHeart style={{marginTop: '2px'}} size={20} color='rgb(66,214,96)' /> </AppearingBall> 
    </BallContainer>
</SwipePageWrapper>
  {props.showResult &&
    <ResultPopup>
      <ItsAMatchText> {props.isMatch ? "It's a match!" : 'No match :('} </ItsAMatchText>
      <InfoText> {props.isMatch ? 'You and Sasken have liked each other.' : 'Not all hope is lost!'} </InfoText>
      {!props.isMatch && <InfoText> Convince the Sasken people next to you. </InfoText>}
      {!props.isMatch && <InfoText> Then ask for a job interview! </InfoText>}

      {props.isMatch && <InfoText> Ask the people for a job interview! </InfoText>}

      <Button
        style={{marginTop: '20px'}}
        onClick={() => window.open('http://www.sasken.fi/about-us')}
      > 
      <InfoText>
        Learn more about Sasken
      </InfoText> 
    </Button>

    <Button
      style={{marginTop: '5px'}}
      onClick={() => props.setInitialState()}
    > 
      <InfoText>
        Start over 
      </InfoText> 
    </Button>
    </ResultPopup>
  }
</React.Fragment>;

const mapStateToProps = (state: State) => ({
  loading: state.loading,
  loadingResult: state.loadingResult,
  isMatch: state.isMatch,
  showResult: state.showResult,
} as SwipePageProps);

const mapDispatchToProps = (dispatch: any) => ({
  getResult: () => {
    dispatch(getResult());
  },
  setInitialState: () => {
    dispatch(setInitialState());
  }
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SwipePage);

