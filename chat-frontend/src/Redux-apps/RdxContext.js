import { createSlice } from '@reduxjs/toolkit'


export const contextMy = createSlice({
    name: 'contextmy',
    initialState: {
        value: '',
        message: ''
      },
    reducers: {
        RoomName: (state, action) => {
            state.value = action.payload
        },
        ServerMessage: (state, action) => {
            state.message = action.payload
        },
    }
})



export const {RoomName, ServerMessage} = contextMy.actions


export default contextMy.reducer