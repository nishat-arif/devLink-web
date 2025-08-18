import { createSlice } from "@reduxjs/toolkit";

const bodySlice = createSlice({

    name : "body" ,
    initialState : {
        showHeaderFooter : false
    },
    reducers : {
        addHeaderFooter : (state , action)=>{

            state.showHeaderFooter = action.payload

        },

  
    }
});

export const {addHeaderFooter} = bodySlice.actions

export default bodySlice.reducer;