import { configureStore } from '@reduxjs/toolkit'
import contextmyReducer from './RdxContext'


export const store = configureStore({
  reducer: {
    nameOfRoom: contextmyReducer,
    messageFromServer: contextmyReducer,
  },
})
