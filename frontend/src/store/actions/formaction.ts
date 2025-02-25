import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER, DELETE_USER, UPDATE_USER, CREATE_USER ,VALIDATE_TOKEN,DESTROY_SESSION,FORM_AUTHETICATE , VALIDATE_RESET_TOKEN} from '../endpoint.ts';

export const GET_USERS = 'GET_USERS'; 
export const GET_USER_DATA = 'GET_USER_DATA'; 
export const DELETE_USERS = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USER';
export const VALIDATE_TOKENS = 'VALIDATE_TOKENS';
export const VALIDATE_RESET_TOKENS = 'VALIDATE_RESET_TOKENS';
export const DESTROY_SESSIONS = 'DESTROY_SESSIONS';


//session destroy is pending @22/2/2025

export const destroySession = createAsyncThunk(
  'session/destroy',async(cookie,thunkAPI)=>{
      try{
          const response = await DESTROY_SESSION(cookie)
          if(response && response.status === 200){
              return true ; 
          }
          else{
              return false;
          }
      }
      catch(error){

      }
  }
)
export const deleteUsers = createAsyncThunk(
  'form/delete',async (id:number,thunkAPI)=>{
    const response = await DELETE_USER(id);
    if(response  && response.status === 200){
      return true
    }
    else{
      return false;
    }
  }
)
export const updateUser =  createAsyncThunk(
  '/dashboard/update',
  async(userData , thunkAPI)=>{
      try{
        const response = await UPDATE_USER(userData);
       
        if(response && response.status === 200){
            return true
        }
        else{
            return false;
        }
      }
      catch(error){
        console.log(error)
      }
  }
);
export const createUser = createAsyncThunk(
  '/form',
  async (userData ,thunkAPI)=>{
    try{
        const response = await CREATE_USER(userData);
       if(response && response.status === 201){
        return true;
       }
       else{
        return false
       }

    }
    catch(error){
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
export const getUsers = createAsyncThunk(
  'form/Getusers',
  async(thunkAPI)=>{
      try{
        const response = await GET_USER();
        if (response && response.status === 200 ) {
          return response.data;
        } else {
          return false;
        }

      }catch(error){
          console.log(error)     
      }
  }
);
export const validateToken = createAsyncThunk(
  'session/validate',  
  async (sessionId: string, thunkAPI) => {
    try {
      const response = await VALIDATE_TOKEN(sessionId);
      if (response.status === 201) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
export const validateResetToken = createAsyncThunk( 
  'form/token/validate',
  async(pass,thunkAPI)=>{
    try{
      const response = await VALIDATE_RESET_TOKEN(pass.token , pass.password , pass.confirm_password);
        if(response && response.status === 201){
          return true;
        }
        else{
          return false;
        }
    }
    catch(error){
      console.log(error)
    }
  }
);
export const validateAuthenticate = createAsyncThunk(
  '/form/auth', async(userdata, thunkAPI)=>{
      try{  
        const response = await FORM_AUTHETICATE(userdata);
        console.log(response)
       if(response && response.status === 201){
          return response.data;
       }
       else{
        return false;
       }

      }
      catch(error){

      }
  }
)



