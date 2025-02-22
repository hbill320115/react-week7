import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './toastSlice'
const store = configureStore({
    reducer:{
        toast:toastReducer
    }
})

export default store;