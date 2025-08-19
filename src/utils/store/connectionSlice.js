import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({

    name : "connection" ,
    initialState : {
        allConnections : null
    },
    reducers : {
        addConnections : (state , action)=>{

            state.allConnections = action.payload

        }

    }
});

export const {addConnections} = connectionSlice.actions

export default connectionSlice.reducer;