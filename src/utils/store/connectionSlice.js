import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({

    name : "connection" ,
    initialState : {
        allConnections : null
    },
    reducers : {
        addConnections : (state , action)=>{

            state.allConnections = action.payload

        },

        clearConnections : (state)=>{

            state.allConnections = null

        }

    }
});

export const {addConnections , clearConnections} = connectionSlice.actions

export default connectionSlice.reducer;