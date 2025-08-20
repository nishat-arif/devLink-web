import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "../store/userSlice";
import feedSlice from '../store/feedSlice'
import requestSlice from '../store/requestSlice'
import connectionSlice from '../store/connectionSlice'


const appStore = configureStore({
    reducer :{
                user: userSlice,
                feed :feedSlice,
                request: requestSlice,
                connection: connectionSlice
            }
})

export default appStore;