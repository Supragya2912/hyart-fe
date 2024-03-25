import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getAllProducts = createAsyncThunk("user/getAllProducts", async () => {
    try{
        const response = await axiosClient.post('/api/hyart/all-products')
        console.log("Product", response);
        return response.result;
    }catch(e){
        return Promise.reject(e);
     }
});

export const getAllCategory = createAsyncThunk("user/getAllCategory", async () => {
    try{
        const response = await axiosClient.post('/api/hyart/all-category')
        console.log("category",response);
        return response.result;
    }catch(e){
        return Promise.reject(e);
     }
});

const productSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        toastData: {},
        myProducts: [],
        category: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.myProducts = action.payload;
        })
        .addCase(getAllCategory.fulfilled, (state, action) => {
            state.category = action.payload;
        })
    }
})

export default productSlice.reducer;
export const {setLoading, showToast} = productSlice.actions;