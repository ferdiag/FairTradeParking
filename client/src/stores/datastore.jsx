import { createContext, useReducer, useState } from 'react';
//wrapped a component in _app.js
const Store = createContext();
const init = {
  isLoggedIn: false,
  userInfo: {},
  allEvents: [],
  errorMessage: '',
  indexOfSelectedEvent: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };
    case 'EVENTS_UPDATE':
      return {
        ...state,
        allEvents: action.payload,
      };
    case 'EVENT_SELECTED':
      return {
        ...state,
        indexOfSelectedEvent: action.payload,
      };
    case 'DAY_SELECTED':
      return {
        ...state,
        selectedDay: action.payload,
      };
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'SET_SNACKBAR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        page: action.payload,
      };
  }
};

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export { Store, StoreProvider };
