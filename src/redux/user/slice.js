import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchUserRequest } from '../../services/user'

const initialState = {
  users: [],
  isLoading: false,
  error: ""
}

export const searchUser = createAsyncThunk(
  'user/searchUserRequest',
  async(payload) => {
    if(payload.length){
        const {data} = await searchUserRequest(payload)
        return data
    } return []
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.user_data = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(searchUser.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(searchUser.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
  }
})

export const { setUsersData, setError } = userSlice.actions

export default userSlice.reducer
