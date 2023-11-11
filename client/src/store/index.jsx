import { configureStore } from '@reduxjs/toolkit'
import signUpUserReducer from './signUpUser'
import signUpLawyerReducer from './signUpLawyer'

export const store = configureStore({
  reducer: {
   signUpUser: signUpUserReducer,
   signUpLawyer: signUpLawyerReducer,
    
  },
})






