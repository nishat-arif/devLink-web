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
        removeUserFromFeed: (state , action)=>{

            const newFeed = state.feedContent.filter((user) => user._id !== action.payload);
            state.feedContent = [...newFeed]
      

        },

        clearFeed: (state )=>{
            state.feedContent = null
      

        },

    }
});

export const {addFeedContent , removeUserFromFeed, clearFeed} = feedSlice.actions

export default feedSlice.reducer;