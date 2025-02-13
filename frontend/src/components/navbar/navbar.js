import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Navbar = () => {

    const url = useLocation();
    const navigate = useNavigate();
    const location = useLocation();
    const [name , setName] = useState();
    const user_name1 = location.state?.userData.name;
    console.log(location.state)
    useEffect(()=>{
        setName(user_name1)
    },[location.pathname])
    
     
   
    const Backtoadd = ()=>{
        navigate('/login');
    }  
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
     
    const destroy = async(e) =>{     
        const cookies = getCookie('token')
        Cookies.remove('token');
        navigate('/login')
        const res = await fetch('http://localhost:5000/session/destroy',{
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"cookie" : cookies})
        })
    }

  return (
    <nav class="navbar">
           <header  class={ url.pathname === '/dashboard' ? 'darks' : ''}>
                <div class={ url.pathname === '/dashboard' ? 'headermain dark' : 'headermain'}>
                    <div class="hedleft">
                    <a href=""><h3>csentral</h3></a>
                    </div>
                    <div class="hedcenter">
                        <ul>
                            <li><a href="">home</a></li>
                            <li><a href="">updates</a></li>
                            {/* <li><a href=""></a></li>
                            <li><a href=""></a></li> */}
                        </ul>
                    </div>
                    <div class=" hedrit">
                        
                            <div class="ritmain">
                            <a href="#" onClick={Backtoadd}>
                                    <div class="icons">
                                    <i class="fa-regular fa-user"></i>
                                    </div>
                                    <div class="userinfo">
                                        <span id="loginname">{user_name1 ? user_name1 : (name ? name : "Log In")}</span>
                                    </div>
                                    </a>
                                    <div class="userinfo">
                                        <button onClick={destroy}>log out</button>
                                    </div>
                            </div>                       
                    </div>  
                </div>      
            </header>
    </nav>
  )
}

 