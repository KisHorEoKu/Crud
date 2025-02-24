import React, { useState } from 'react'
import { useNavigate , useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { validateToken } from './store/actions/formaction.ts'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';


export const Main = () => {

    const navigate = useNavigate(); 
    const [allow ,setAllow] =useState(true);
    const location = useLocation();
    const dispatch = useDispatch(); 
    useEffect(()=>{
    },[])
    useEffect(()=>{ 
      const cookieCheck = async() => {
        const data = getCookie('token');

        if (data) {
          try{
              const response = await dispatch(validateToken(data)).unwrap();
              console.log(response)
              if(response.data && allow ){
                const availableRoutes = ['/login', '/'];
                const path = location.pathname;
                getName();
                if(! availableRoutes.includes(path)) navigate(path, { state:{ userData: data } }) 
                setAllow(false);
              }
              else if(response === ''){
                Cookies.remove('token');
                window.location.reload();
              }
              else{ 
                 if(!allow){navigate('/dashboard', { state:{ userData: data } });}
                setAllow(true);    
              }
          }
          catch(error){
              console.log(error)
          }          
        }
        else{   
          const availableRoutes = ['/login', '/','/form/reset'];
          const path = location.pathname;
          if( availableRoutes.includes(path)) {navigate(path) }
          else navigate('/login')  
        }
      };
      cookieCheck();
      setAllow(false)
    
    },[dispatch])
  const getName =(e)=>{

  }

 
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

 
 

  return (
    <div>

    </div>
  )
}
