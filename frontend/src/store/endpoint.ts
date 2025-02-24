import axios from 'axios';
import env from "react-dotenv";
import { data } from 'react-router-dom';

const instance = axios.create({
  baseURL: env?.APP_URL || 'http://localhost:5000' ,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const GET_USER = () => {
  return instance.get('/form/Getusers');
};

export const DELETE_USER = (id) => {
  return instance.delete(`/form/delete`,{
        data:{ id }
  });
};

export const UPDATE_USER = (userData) => {
  return instance.put('/dashboard/update', userData);
};

export const CREATE_USER = (userData) => {
  return instance.post('/form', userData);
};
export const VALIDATE_TOKEN = (sessionId) =>{
    return instance.post('/session/validate',{
        data : {sessionId}
    })
}

export const DESTROY_SESSION = (cookie)=>{
  return instance.delete('/session/destroy',{
        data : {cookie}
  })
}

export const VALIDATE_RESET_TOKEN =(token:string,password:string, confirm_password:string)=>{
  return instance.post('/form/token/validate',{
        token,
        password,
        confirm_password
  })
};

export const FORM_AUTHETICATE = (userdata) =>{
  return instance.post('/form/auth',userdata)
}