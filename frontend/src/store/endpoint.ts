import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const GET_USER = () => {
  return instance.get('/form/Getusers');
};


// yet to continue
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
export const VALIDATE_TOKEN = (token) =>{
    return instance.post('/session/validate')
}

