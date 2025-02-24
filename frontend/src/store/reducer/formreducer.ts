import { createSlice } from '@reduxjs/toolkit';
import { validateToken , getUsers, createUser, updateUser ,destroySession , validateAuthenticate} from '../actions/formaction.ts';

const initialState = {
  users: [],
  authenticatedUser: null,
  validate: [],  
  createUser:'',
  error: '',
  loading: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.validate = action.payload.name;  
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Validation failed';  
      })
      .addCase(getUsers.pending,(state )=>{
          state.loading= true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;  
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Users fetch failed';  
      })
      .addCase(createUser.pending,(state)=>{
        state.loading= true;
      })
      .addCase(createUser.fulfilled,(state, action)=>{
        state.loading = false;
        state.createUser= (action.meta.requestId)
      })
      .addCase(createUser.rejected,(state, action)=>{
        state.loading= false;
        state.error = action.error?.message || 'Users Not Created';  
      })
      .addCase(updateUser.pending,(state)=>{
        state.loading= true;
      })
      .addCase(updateUser.fulfilled,(state, action)=>{
        state.loading = false;
        state.createUser= (action.meta.requestId)
      })
      .addCase(updateUser.rejected,(state, action)=>{
        state.loading= false;
        state.error = action.error?.message || 'Users Not Updated';  
      })
     .addCase(destroySession.pending,(state)=>{
        state.loading =  true;
     })
     .addCase(destroySession.fulfilled,(state, action)=>{
        state.loading = false;
        state.users = [];
        state.validate = [];
     })
     .addCase(destroySession.rejected, (state, action)=>{
        state.loading = false;
     })
     .addCase(validateAuthenticate.pending, (state) => {
      state.loading = true;
    })
    .addCase(validateAuthenticate.fulfilled, (state, action) => {
      state.loading = false;
      state.validate = action.payload.name
    })
    .addCase(validateAuthenticate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'validateAuthenticate  failed';  
    })
     
  },
  
});

export default formSlice.reducer;  
