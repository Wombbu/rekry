import styled from 'styled-components';
import * as ReactRedux from 'react-redux';
import * as React from 'react';
import Slider from 'rc-slider';
import {State, changeUserData, Page, setPage} from '../redux';
import 'rc-slider/assets/index.css';
import './react-toggle.css';
import Toggle from 'react-toggle'
import c from './common';

const SettingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  background-color: ${c.greyBg};
  overflow: scroll;
  flex: 1;
`;

const SettingsGroup = styled.div`
  box-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  border-radius: 3px;
  padding: 10px 10px 0px 10px;
  background-color: white;
  margin-bottom: 7px;
  margin-top: 5px;
`

const StyledSlider = styled(Slider)`
  > .rc-slider-handle:active {
    background-color: ${c.darkerRed};
  }
  > .rc-slider-handle {
    background-color: ${c.red};
    border: none;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
    width: 18px;
    height: 18px;
    margin-top: -8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  > .rc-slider-track {
    background-color: ${c.red};
    transition: all 0.2s ease;
  }
  cursor: pointer;
  margin: 15px 10px 15px 10px;
  width: 90%;
`;

interface SliderProps {
  title: string;
  children?: any;
  onChange: (value: number) => void;
}

const SliderInputGroup = (props: SliderProps) =>
  <SettingsGroup>
    <c.Font color={c.red} size={15}> {props.title} </c.Font>
    <StyledSlider
      min={0}
      max={5}
      onChange={props.onChange}
    />
    {props.children}
  </SettingsGroup>;

interface RadioProps {
  title: string;
  onChange: (value: boolean) => void;
}

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const RadioInput = (props: RadioProps) =>
  <RadioWrapper>
    <c.Font size={13} color={c.red}> {props.title} </c.Font>
    <Toggle
      defaultChecked={false}
      icons={false}
      onChange={(event: any) => {
        props.onChange(event.target.checked);
      }}/>
  </RadioWrapper>;

const SubmitButton = SettingsGroup.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 10px;
  &:hover {
    background-color: rgb(245,245,245);
    cursor: pointer;
  }
  &:active {
    background-color: rgb(205,205,205);
  }
`;

interface SettingsPageProps {
  changeUserData: (override: any) => void;
  setPage: () => void;
}

export const SettingsPage = (props: SettingsPageProps) =>
<React.Fragment>
  <c.TopBar>
    <c.SaskenLogo />
    <c.Font size={15} color={c.darkFont}> Go ahead, start filling! </c.Font> 
  </c.TopBar>
  <SettingPageWrapper> 
    <c.Font style={{paddingLeft: '5px'}} size={15} color={c.darkFont}> Languages </c.Font>
    <SliderInputGroup
      title='Java'
      onChange={(java) => props.changeUserData({java})}
    >
      <div style={{paddingLeft: '8px', paddingRight: '8px'}}>
        <RadioInput title='Android' onChange={android => props.changeUserData({android})} />
      </div>
    </SliderInputGroup>
    <SliderInputGroup
      title='C++'
      onChange={cpp => props.changeUserData({cpp})}
    />
    <SliderInputGroup
      title='JavaScript'
      onChange={js => props.changeUserData({js})}
    >
      <div style={{paddingLeft: '8px', paddingRight: '8px'}}>
        <RadioInput title='React' onChange={react => props.changeUserData({react})} />
      </div>
    </SliderInputGroup>
    <c.Font style={{paddingLeft: '5px'}} size={15} color={c.darkFont}> Special skills </c.Font>
    <SettingsGroup style={{paddingTop: '15px'}}>
      <RadioInput title='Beer brewing' onChange={brewing => props.changeUserData({brewing})} />
      <RadioInput title='Lousy sense of humor' onChange={humor => props.changeUserData({humor})} />
      <RadioInput title='Snooker' onChange={snooker => props.changeUserData({snooker})} />
      <RadioInput title='Coffee making' onChange={coffee => props.changeUserData({coffee})} />
    </SettingsGroup>
    <SubmitButton
      onClick={() => props.setPage()}
    > 
      <c.Font size={13} color={c.red}>
        Submit 
      </c.Font>  
    </SubmitButton>
  </SettingPageWrapper>
</React.Fragment>;

const mapStateToProps = (state: State) => ({

} as SettingsPageProps);

const mapDispatchToProps = (dispatch: any) => ({
  changeUserData: (override: any) => {
    dispatch(changeUserData(override));
  },
  setPage: () => {
    dispatch(setPage(Page.SWIPE));
  }
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SettingsPage);