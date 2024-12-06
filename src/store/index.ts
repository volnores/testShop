import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import ProductsSlice from './slices/ProductsSlice';
import FilterSlice from './slices/FilterSlice';
import CreateSlice from './slices/CreateSlice';

export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    filter: FilterSlice,
    create: CreateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
