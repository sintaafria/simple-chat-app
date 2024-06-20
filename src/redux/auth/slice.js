import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginRequest, logoutRequest, signupRequest, userProfileRequest } from '../../services/auth'

const initialState = {
  user_data: null,
  isLoading: false,
  error: ""
}

export const login = createAsyncThunk(
  'auth/loginRequest',
  async(payload) => {
    const {data} = await loginRequest(payload)
    return data
  }
)

export const userProfile = createAsyncThunk(
  'auth/userProfileRequest',
  async() => {
    const {data} = await userProfileRequest()
    return data
  }
)

export const logout = createAsyncThunk(
  'auth/logoutRequest',
  async() => {
    const {data} = await logoutRequest()
    return data
  }
)

export const signup = createAsyncThunk(
  'auth/signupRequest',
  async(payload) => {
    const {data} = await signupRequest(payload)
    return data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user_data = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user_data = action.payload.user
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
      .addCase(userProfile.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user_data = action.payload
      })
      .addCase(userProfile.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
      .addCase(logout.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.user_data = null
      })
      .addCase(logout.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
      .addCase(signup.pending, state => {
        state.isLoading = true
        state.error = ""
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
        state.user_data = action.payload
      })
      .addCase(signup.rejected, (state, action) =>{
        state.isLoading = false
        state.error = action.error?.message || action.error
      })
  }
})

export const { setUserData, setError } = authSlice.actions

export default authSlice.reducer
