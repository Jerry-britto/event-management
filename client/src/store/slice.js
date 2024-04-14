import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
}

export const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export const {setUser} = eventSlice.actions;
export default eventSlice.reducer;