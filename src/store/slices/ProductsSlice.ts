import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IProduct {
  availabilityStatus: string;
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  images: string;
}

interface ProductSlice {
  data: IProduct[];
  productIdPage: IProduct | null;
  isLoading: boolean;
  error: string | null;
  isLikedProduct: { [id: number]: boolean };
  currentPage: number;
  productsPerPage: number;
}

const initialState: ProductSlice = {
  data: JSON.parse(localStorage.getItem('products') || '[]'),
  productIdPage: null,
  isLoading: false,
  error: null,
  isLikedProduct: JSON.parse(localStorage.getItem('likedProducts') || '{}'),
  currentPage: 1,

  productsPerPage: 10,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllProducts = createAsyncThunk<IProduct[], void>(
  'Products/getAllProducts',
  async () => {
    const response = await axios.get(`${BASE_URL}`);
    if (response.status !== 200) {
      throw new Error('Не удалось получить продукты');
    }

    return response.data.products;
  },
);

export const getProductInfoById = createAsyncThunk<IProduct, string>(
  'Products/getProductById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    if (response.status !== 200) {
      throw new Error('Не удалось получить инфо продукта');
    }
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk<void, number>('Product/deleteProduct', async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  if (response.status !== 200) {
    throw new Error('Не удалось удалить продукт');
  }
  return response.data;
});

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: IProduct) => {
    const response = await axios.post(`${BASE_URL}/add`, newProduct);
    if (response.status !== 201) {
      throw new Error('Не удалось создать продукт');
    }
    return response.data;
  },
);

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLikedProduct: (state, action: PayloadAction<{ id: number; isLikedProduct: boolean }>) => {
      const { id, isLikedProduct } = action.payload;
      state.isLikedProduct[id] = isLikedProduct;
      localStorage.setItem('likedProducts', JSON.stringify(state.isLikedProduct));
    },

    setAddProduct: (state, action: PayloadAction<IProduct>) => {
      state.data.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.data));
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        localStorage.setItem('products', JSON.stringify(state.data));
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(getProductInfoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductInfoById.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.productIdPage = action.payload;
        state.error = null;
      })
      .addCase(getProductInfoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.meta.arg);
        localStorage.setItem('products', JSON.stringify(state.data));
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка удаления продукта';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.data.push(action.payload);
        localStorage.setItem('products', JSON.stringify(state.data));
      });
  },
});

export const { setIsLikedProduct, setAddProduct, setCurrentPage, setProductsPerPage } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;
