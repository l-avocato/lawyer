import { configureStore } from '@reduxjs/toolkit'
import signUpUserReducer from './signUpUser'


export const store = configureStore({
  reducer: {
    signUpUser: signUpUserReducer,

    
  },
})






