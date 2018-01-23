import {createStore, AnyAction, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// Actions

const actionTypes = {
  changeUserData: 'CHANGE_USER_DATA',
  setPage: 'SET_PAGE',
  setLoading: 'SET_LOADING',
  setLoadingResult: 'SET_LOADING_RESULT',
  showResult: 'SHOW_RESULT',
  setInitialState: 'SET_INITIAL_STATE',
  changeContactInfo: 'CHANGE_CONTACT_INFO',
}

export const changeUserData = (payload: any) => ({type: actionTypes.changeUserData, payload});

export const changeUserContactInfo = (payload: any) => ({type: actionTypes.changeContactInfo, payload});

export const setPage = (page: Page) => (dispatch: any, getState: () => State) => {
  fetch('localhost:3001/add', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({contactInfo: getState().personalData, skills: getState().skills}), 
      headers: new Headers({'Content-Type': 'application/json'})
    }
  )
    .then(() => console.log('user data saved'))
    .catch(error => console.log('user data save failed', error));

  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(setLoading(false));
  }, 2000);
  
  dispatch({type: actionTypes.setPage, payload: page});
} 

const setLoading = (loading: boolean) => ({type: actionTypes.setLoading, payload: loading});

const setLoadingResult = (loading: boolean) => ({type: actionTypes.setLoadingResult, payload: loading});

const showResult = (isMatch: boolean) => ({type: actionTypes.showResult, payload: isMatch});

export const setInitialState = () => ({type: actionTypes.setInitialState});

export const getResult = () => (dispatch: any, getState: () => State) => {
  dispatch(setLoadingResult(true));
  setTimeout(() => {
    dispatch(showResult(calculateMatch(getState().skills)));
  }, 1000);
} 

const calculateMatch = (skills: Skills) => {
  const minPoints = 8;

  return Number(skills.react) 
    + Number(skills.android)
    + Number(skills.brewing)
    + Number(skills.coffee)
    + Number(skills.snooker)
    + Number(skills.humor)

    + skills.java
    + skills.js
    + skills.cpp
    > minPoints;
}

// Reducer

export interface Skills {
  java: number,
  android: boolean,
  cpp: number,
  js: number,
  react: boolean,

  brewing: boolean,
  humor: boolean,
  coffee: boolean,
  snooker: boolean,
}

export interface PersonalData {
  name: string,
  email: string,
}

export enum Page {
  SETTINGS,
  SWIPE,
}

export interface State {
  personalData: PersonalData,
  page: Page,
  loading: boolean,
  showResult: boolean,
  isMatch: boolean,
  skills: Skills,
  loadingResult: boolean,
}

const reducer = (state: State, action: AnyAction) => {
  switch(action.type) {
    case actionTypes.changeUserData:
      return {...state, skills: {...state.skills, ...action.payload}};
    case actionTypes.setPage:
      return {...state, page: action.payload};
    case actionTypes.setLoading:
      return {...state, loading: action.payload};
    case actionTypes.setLoadingResult:
      return {...state, loadingResult: action.payload};
    case actionTypes.showResult:
      return {...state, showResult: true, isMatch: action.payload};
    case actionTypes.changeContactInfo:
      return {...state, personalData: {...state.personalData, ...action.payload}};
    case actionTypes.setInitialState:
      return initialState;
    default:
      return state;
  }
}

// Create redux store

const initialState = {
  personalData: {
    name: '',
    email: '',
  },
  page: Page.SETTINGS,
  showResult: false,
  loading: false,
  loadingResult: false,
  isMatch: false,
  skills: {
    java: 0,
    android: false,
    cpp: 0,
    js: 0,
    react: false,
    brewing: false,
    humor: false,
    coffee: false,
    snooker: false,
  }
};

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));