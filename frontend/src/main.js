import React, { useState } from 'react'
import { BrowserRouter as Router , Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


export const Main = () => {

    const navigate = useNavigate(); 
    const [allow ,setAllow] =useState(true);

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
        if (datas && allow ) {
          console.log(datas)

        }else{
          navigate('/dashboard', { state: { userData: datas } });

        }
      })
      .catch((error) => console.log("Error during session validation:", error));
    }
    else{
      navigate('/login')
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
