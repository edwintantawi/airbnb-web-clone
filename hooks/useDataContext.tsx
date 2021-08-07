import { useContext } from 'react';
import { DataContext } from '../context/store';

export const useDataContext = () => useContext(DataContext);
