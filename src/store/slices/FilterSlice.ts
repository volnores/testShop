import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterSlice {
  selectedCategory: string;
  searchByWord: string;
}

const initialState: IFilterSlice = {
  selectedCategory: '',
  searchByWord: '',
};

export const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchByWord: (state, action: PayloadAction<string>) => {
      state.searchByWord = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchByWord } = FilterSlice.actions;

export default FilterSlice.reducer;
