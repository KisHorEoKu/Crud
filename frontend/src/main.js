import React, { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { validateToken } from './store/actions/formaction.ts'


export const Main = () => {

    const navigate = useNavigate(); 
    const [allow ,setAllow] =useState(true);
    const location = useLocation();

  // Check cookie and validate session
  const cookieCheck = async() => {
    const data = getCookie('token');
    if (data) {
      try{
        console.log("API entered to validate");
          const response = await validateToken(data);
          if(response.data && allow){
            const availableRoutes = ['/login', '/'];
            const path = location.pathname;
            if(! availableRoutes.includes(path)) navigate(path, { state:{ userData: data } }) 
            setAllow(false)
            const user_name = data.name;
            const ele = document.getElementById('loginname');
            ele.innerText = user_name ? user_name : 'Login';
          }
          else{ 
             navigate('/dashboard', { state:{ userData: data } });
            console.log(data)
            const user_name = data.name;
            const ele = document.getElementById('loginname');
            ele.innerText = user_name ? user_name : 'Login';
          }
      }
      catch(error){
          console.log(error)
      }          
    }
    else{   
      console.log("entered to else part ")
      const availableRoutes = ['/login', '/','/form/reset'];
      const path = location.pathname;
      if( availableRoutes.includes(path)) navigate(path) 
      else navigate('/login')  
    }
  };
 
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  useEffect(() => {
    cookieCheck();
    setAllow(false)
  }, []); 
 

  return (
    <div>

    </div>
  )
}
