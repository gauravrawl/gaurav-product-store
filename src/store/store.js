import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/products'

const reducer = {
    product: productReducer,
  }

const store = configureStore({
    reducer: reducer,
    devTools: true,
  })
  
export default store;