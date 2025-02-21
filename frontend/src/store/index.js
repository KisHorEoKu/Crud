import { configureStore } from '@reduxjs/toolkit';
import  formReducer  from './reducer/formreducer.ts'; 

const store = configureStore({
  reducer: {
    form: formReducer, 
  },
  
});

export default store;
