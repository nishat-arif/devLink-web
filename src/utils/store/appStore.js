import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "../store/userSlice";
import bodyReducer from "../store/bodySlice"
import feedSlice from '../store/feedSlice'
import requestSlice from '../store/requestSlice'
import connectionSlice from '../store/connectionSlice'


const appStore = configureStore({
    reducer :{
                user: userSlice,
                body: bodyReducer,
                feed :feedSlice,
                request: requestSlice,
                connection: connectionSlice
            }
})

export default appStore;