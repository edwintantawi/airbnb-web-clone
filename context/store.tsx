import { createContext, useReducer } from 'react';
import { dataReducer } from './reducer';

export const initialState = {
  location: '',
  checkIn: '',
  checkOut: '',
  guests: '',
};

export const DataContext = createContext(null);

export const ContextProvider = ({ children }) => (
  <DataContext.Provider value={useReducer(dataReducer, initialState)}>
    {children}
  </DataContext.Provider>
);
