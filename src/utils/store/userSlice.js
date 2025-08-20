import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

    name : "user" ,
    initialState : {
        userData : null
    },
    reducers : {
        addUser : (state , action)=>{

            state.userData = action.payload

        },

        removeUser : (state )=>{
            state.userData = null
        },
    }
});

export const {addUser  , removeUser} = userSlice.actions

export default userSlice.reducer;