import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchUserRequest } from '../../services/user'
import { chatListRequest } from '../../services/chat'

const initialState = {
  chat_list: [],
  isLoading: false,
  error: ""
}

export const chatList = createAsyncThunk(
  'chat/chatListRequest',
  async(payload) => {
    const {data} = await chatListRequest(payload)
    return data
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.chat_list = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(chatList.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(chatList.fulfilled, (state, action) => {
        state.isLoading = false
        state.chat_list = action.payload
      })
      .addCase(chatList.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
  }
})

export const { setChatList, setError } = chatSlice.actions

export default chatSlice.reducer
