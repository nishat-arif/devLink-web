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

        removeConnection : (state , action)=>{

            const newConnections =  state.allConnections.filter(connection => connection._id != action.payload);
            state.allConnections = [...newConnections]

        },

        clearConnections : (state)=>{

            state.allConnections = null

        }

    }
});

export const {addConnections , removeConnection ,clearConnections} = connectionSlice.actions

export default connectionSlice.reducer;