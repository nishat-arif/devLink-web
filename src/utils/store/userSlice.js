import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name : "user" ,
    initialState : {
        loggedInData : null
    },
    reducers : {
        addLoginCrdentials : (state , action)=>{

            state.loggedInData = action.payload

        },

        removeLoginCredentials : (state )=>{
            state.loggedInData = null
        }
    }
});

export const {addLoginCrdentials  , removeLoginCredentials} = userSlice.actions

export default userSlice.reducer;