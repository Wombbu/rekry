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
}

export const changeUserData = (payload: any) => {
  return {type: actionTypes.changeUserData, payload};
}

export const setPage = (page: Page) => (dispatch: any, getState: () => State) => {
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
  const minPoints = 15;

  return Number(skills.brewing) 
    + Number(skills.decorations)
    + Number(skills.dunno)
    + Number(skills.heeh)
    + Number(skills.privacy)
    + skills.java
    + skills.python
    + skills.js
    + skills.cpp
    > minPoints - 16;
}

// Reducer

export interface Skills {
  java: number,
  cpp: number,
  js: number,
  python: number,

  decorations: boolean,
  brewing: boolean,
  privacy: boolean,
  dunno: boolean,
  heeh: boolean,
}

export enum Page {
  SETTINGS,
  SWIPE,
}

export interface State {
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
    case actionTypes.setInitialState:
      return initialState;
    default:
      return state;
  }
}

// Create redux store

const initialState = {
  page: Page.SETTINGS,
  showResult: false,
  loading: false,
  loadingResult: false,
  isMatch: false,
  skills: {
    java: 0,
    cpp: 0,
    js: 0,
    python: 0,
    decorations: false,
    brewing: false,
    privacy: false,
    dunno: false,
    heeh: false,
  }
};

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));