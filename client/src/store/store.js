import {configureStore} from '@reduxjs/toolkit'; //1st step is to make a store
import eventReducer from "./slice.js"
export const store = configureStore({
    reducer:eventReducer
})