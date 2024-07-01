import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { allMessagesRequest } from '../../services/message'

const initialState = {
  messages: [],
  isLoading: false,
  error: ""
}

export const allMessages = createAsyncThunk(
  'chat/allMessagesRequest',
  async(chat_id) => {
    const {data} = await allMessagesRequest(chat_id)
    return data
  }
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(allMessages.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(allMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = action.payload
      })
      .addCase(allMessages.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
  }
})

export const { setMessages, setError } = messageSlice.actions

export default messageSlice.reducer
