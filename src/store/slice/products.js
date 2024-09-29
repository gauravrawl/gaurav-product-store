import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../apiConfig/services";

const initialState = {
  productData: [],
  categoryList: [],
  loading: false,
  error: null,
  isLoading: false
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductData(state, action) {
      state.productData = action.payload;
    },
    setIsLoading(state, action){
        state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload; 
        console.log(state.categoryList)
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(state.error)
      });
  },
});

const { reducer, actions } = productSlice;

export const { setProductData, setIsLoading } = actions;

export default reducer;
