import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER, DELETE_USER, UPDATE_USER, CREATE_USER ,VALIDATE_TOKEN} from '../endpoint.ts';
import { Dispatch } from 'redux';

export const GET_USER_DATA = 'GET_USER_DATA'; 
export const DELETE_USERS = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USER';
export const VALIDATE_TOKENS = 'VALIDATE_TOKENS';


export const deleteUser = async (req, res,dispatch) =>  { 
  try {
    const response = await DELETE_USER(Number(req))  ;
    if(response && response.status === 200 ){
      return true
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error)
  }
};
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
        return thunkAPI.rejectWithValue('Invalid session ID');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


