import { createContext, useReducer } from 'react';
import { dataReducer } from './reducer';

interface IInitialState {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: 0;
}

export const initialState: IInitialState = {
  location: '',
  checkIn: null,
  checkOut: null,
  guests: 0,
};

export const DataContext = createContext(null);

export const ContextProvider = ({ children }) => (
  <DataContext.Provider value={useReducer(dataReducer, initialState)}>
    {children}
  </DataContext.Provider>
);
