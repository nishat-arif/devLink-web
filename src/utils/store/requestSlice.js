import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({

    name : "request" ,
    initialState : {
        allRequests : null
    },
    reducers : {
        addRequests : (state , action)=>{

            state.allRequests = action.payload

        },
        removeRequests: (state , action)=>{

            const newRequests = state.allRequests.filter((user) => user._id !== action.payload);
            state.allRequests = [...newRequests]
      

        },

    }
});

export const {addRequests , removeRequests} = requestSlice.actions

export default requestSlice.reducer;