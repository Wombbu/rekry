import {createStore, AnyAction, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// Actions

const actionTypes = {
  changeUserData: 'CHANGE_USER_DATA',
  setPage: 'SET_PAGE',
  setLoading: 'SET_LOADING',
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
  skills: Skills,
}

const reducer = (state: State, action: AnyAction) => {
  switch(action.type) {
    case actionTypes.changeUserData:
      return {...state, skills: {...state.skills, ...action.payload}};
    case actionTypes.setPage:
      return {...state, page: action.payload};
    case actionTypes.setLoading:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}

// Create redux store

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default createStore(reducer, {
  page: Page.SETTINGS,
  showResult: false,
  loading: false,
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
  }}, composeEnhancers(applyMiddleware(thunk)));