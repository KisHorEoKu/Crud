import axios from 'axios';
import env from "react-dotenv";

const instance = axios.create({
  baseURL: env.APP_URL ,
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
// export const AUTH_USER = ()

