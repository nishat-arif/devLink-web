import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({

    name : "feed" ,
    initialState : {
        feedContent : null
    },
    reducers : {
        addFeedContent : (state , action)=>{

            state.feedContent = action.payload

        },

    }
});

export const {addFeedContent} = feedSlice.actions

export default feedSlice.reducer;