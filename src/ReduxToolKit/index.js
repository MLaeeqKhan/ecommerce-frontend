import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

const store = configureStore({
    reducer:{
        users:Slice,
    },
});

export default store;