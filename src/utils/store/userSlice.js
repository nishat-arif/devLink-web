import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name : "user" ,
    initialState : {
        loggedInData : null
    },
    reducers : {
        addLoginCrdentials : (state , action)=>{

            state.loggedInData = action.payload

        }
    }
});

export const {addLoginCrdentials} = userSlice.actions

export default userSlice.reducer;