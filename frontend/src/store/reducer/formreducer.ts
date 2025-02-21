import { createSlice } from '@reduxjs/toolkit';
import { validateToken , getUsers, createUser, updateUser} from '../actions/formaction.ts';

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
        state.error = '';
        state.loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.validate = action.payload;  
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
     
  },
  
});

export default formSlice.reducer;  
