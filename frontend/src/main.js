import React, { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom';
import { useEffect } from 'react';


export const Main = () => {

    const navigate = useNavigate(); 
    const [allow ,setAllow] =useState(true);
    const location = useLocation();

  // Check cookie and validate session
  const cookieCheck = () => {
    const data = getCookie('token');
    if (data) {
      console.log("API entered to validate");
      const valid = { "data": data };
      fetch('http://localhost:5000/session/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valid),
      })
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas)
        if (datas && allow ) {
          const availableRoutes = ['/login', '/'];
          const path = location.pathname;
          if(! availableRoutes.includes(path)) navigate(path, { state:{ userData: datas } }) 
          setAllow(false)
          const user_name = datas.name;
          const ele = document.getElementById('loginname');
          ele.innerText = user_name ? user_name : 'Login';


        }else{
          navigate('/dashboard', { state:{ userData: datas } });
          console.log(datas)
          const user_name = datas.name;
          const ele = document.getElementById('loginname');
          ele.innerText = user_name ? user_name : 'Login';
        }
      })
      .catch((error) => console.log("Error during session validation:", error));
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
