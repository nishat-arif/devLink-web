import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "../store/userSlice";
import bodyReducer from "../store/bodySlice"
import feedSlice from '../store/feedSlice'

const appStore = configureStore({
    reducer :{
                user: userSlice,
                body: bodyReducer,
                feed :feedSlice
            }
})

export default appStore;