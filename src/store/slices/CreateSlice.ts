import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICreateSlice {
  isOpenModal: boolean;
  availabilityStatus: string;
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  images: string;
}

const initialState: ICreateSlice = {
  isOpenModal: false,
  availabilityStatus: 'In Stock',
  id: 0,
  brand: '',
  category: '',
  description: '',
  price: 0,
  title: '',
  images: '',
};

export const CreateSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setChangeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setChangeDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setChangeBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setChangeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setChangePrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  setIsOpenModal,
  setChangeBrand,
  setChangeCategory,
  setChangeDescription,
  setChangePrice,
  setChangeTitle,
} = CreateSlice.actions;

export default CreateSlice.reducer;
