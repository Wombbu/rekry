import * as React from 'react';
import * as ReactRedux from 'react-redux'
import styled, {injectGlobal} from 'styled-components';
import {State, Skills, Page} from '../redux';
import SettingsPage from './user-details-page';
import SwipePage from './swipe-page';
import c from './common';
import { FaBattery3 } from 'react-icons/lib/fa';

// Styled-components

injectGlobal`
  body {
    margin: 0px;
  }
`

const AppWrapper = styled.div`
  background-color: rgb(250,250,250);
  background-image: url("./iphone.png");
  background-size: 600px;
  background-repeat:no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const PhoneDisplayWrapper = styled.div`
  position: absolute;
  margin: auto;
  background-color: #fff;
  width: 265px;
  height: 470px;
  top:-3px;
  bottom: 0;
  left: 1px;
  right: -0.5px;
  border-radius: 3px;
  border: 2px solid rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`
const StatusBar = styled.div`
  height: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
  font-family: 'Helvetica', sans-serif;
  padding-right: 10px;
`;

const TinderAppWrapper = styled.div`
    font-family: 'Varela Round', sans-serif;
    font-weight: bold;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
`;

const SaskenLogo = styled.div`
  min-height: 51px;
  min-width: 124px;
  background-image: url(./sasken-logo-big.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

// React-component

interface Props {
  page: Page;
  skills: Skills;
  showResult: boolean,
}

const Router = (props: {settings: any, swipe: any, currentPage: Page}) => {
  switch(props.currentPage) {
    case Page.SETTINGS:
      return props.settings;
    case Page.SWIPE:
      return props.swipe;
    default:
      return props.settings;
  }
}

const App = (props: Props) => 
<AppWrapper>
  <PhoneDisplayWrapper>
    <StatusBar>
      <c.Font size={11}> &#8226; &#8226; &#8226; &#8226; &#8226; </c.Font>
      <c.Font size={10}> Sasken Finland </c.Font>
      <FaBattery3 style={{paddingLeft: '15px'}} size={14} />
    </StatusBar>
    <TinderAppWrapper>
      <Router
        settings={<SettingsPage />}
        swipe={<SwipePage />}
        currentPage= {props.page}
      />
    </TinderAppWrapper>
  </PhoneDisplayWrapper>
  <SaskenLogo />
</AppWrapper>;

// Redux-bindings of the created component + export

const mapStateToProps = (state: State) => ({
  page: state.page,
  skills: state.skills,
  showResult: state.showResult,
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
