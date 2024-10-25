import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const selectCurrProduct = (state) => {
  const allProducts = state.product.products;
  const selectedIndex = state.product.view_index;
  return selectedIndex > -1 ? allProducts[selectedIndex] : {};
};

export const fetchSharkNinja = createAsyncThunk('product/fetchSharkNinja', async () => {
  const jsonData = await fetch('/data/data.json');
  const data = await jsonData.json();
  return data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    view_index: -1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSharkNinja.fulfilled, (state, action) => {
      state.products = action.payload;
      state.view_index = 0;
    });
  },
});

export default productSlice.reducer;
