import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/slice"
import userReducer from "./user/slice"
import chatReducer from "./chat/slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer
  }
})
