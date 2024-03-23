import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMyProfile = createAsyncThunk("user/getMyProfile", async () => {
    try{
        const response = await axiosClient.post('/api/auth/get-profile')
        return response.result;
    }catch(e){
        return Promise.reject(e);
     }
});

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        toastData: {},
        myProfile: null,
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
        .addCase(getMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user;
        })
    }
})

export default appConfigSlice.reducer;
export const {setLoading, showToast} = appConfigSlice.actions;