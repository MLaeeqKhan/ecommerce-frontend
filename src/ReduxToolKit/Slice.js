import { createSlice } from "@reduxjs/toolkit";

const slice= createSlice({
    name:"user",
    initialState:[],
    reducers:{
        userData(state,action){
            return action.payload;
        },
    },
});

export default slice.reducer;
export const {userData} = slice.actions;