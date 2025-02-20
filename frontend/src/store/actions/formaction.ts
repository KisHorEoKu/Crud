import { GET_USER, DELETE_USER, UPDATE_USER, CREATE_USER ,VALIDATE_TOKEN} from '../endpoint.ts';
import { Dispatch } from 'redux';


export const GET_USER_DATA = 'GET_USER_DATA'; 
export const DELETE_USERS = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USER';
export const VALIDATE_TOKENS = 'VALIDATE_TOKEN';



export const getUsers =  (req, res) => async (dispatch:Dispatch)=> {
  try {
    const response = await GET_USER();
    dispatch({
          type:'GET_USER_DATA',
          payload: response.data
    })
    return response.data; 
  } catch (error) {
    console.error('Error fetching users->:', error);
    return res.json({ message: 'Error fetching users', error: error.message });
  }
};

export const deleteUser = async (req, res) => { 
  try {
    const response = await DELETE_USER(Number(req))  
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (req, res) => {
  const { userData } = req.body; 
  try {
    const response = await UPDATE_USER(userData);
    return res.status(200).json({ message: 'User updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const createUser = async (req, res) => {
    try {
    const response = await CREATE_USER(req);
    if(response && response.status === 201){
        return true;
    }
    else{
      return false;
    }
   

  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
};

export const validateToken = async (req, res) =>{
    try{
      const response = await VALIDATE_TOKEN(req);
      if(response && response.status === 201){
        return response.data;
      }
      else{
        return false;
      }
      
    }catch(error){
        
    }
}
