import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./baseUrl";
import axios from "axios";

//Api for all categories of product
export const fetchCategories = createAsyncThunk(
    "products/category",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseUrl}/categories`);
        console.log(response.data)
        return response.data; 
      } catch (err) {
        return rejectWithValue('fetching issue',err.response.data); 
      }
    }
  );