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

        updateUserIsPremium : (state, action)=>{
            state.userData["isPremium"] = action.payload

        }
    }
});

export const {addUser  , removeUser, updateUserIsPremium} = userSlice.actions

export default userSlice.reducer;