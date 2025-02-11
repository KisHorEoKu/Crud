import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {

    const url = useLocation();
    const [location , setLocation] = useState();
    
  return (
    <nav class="navbar">
           <header  class={ url.pathname === '/dashboard' ? 'darks' : ''}>
                <div class={ url.pathname === '/dashboard' ? 'headermain dark' : 'headermain'}>
                    <div class="hedleft">
                    <a href=""> <h3>csentral</h3></a>
                       
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
                        <a href="#">
                            <div class="ritmain">
                                    <div class="icons">
                                    <i class="fa-regular fa-user"></i>
                                    </div>
                                    <div class="userinfo">
                                        <span>kishore</span>
                                    </div>
                            </div>
                        </a>
                    </div>  
                </div>      
            </header>
    </nav>
  )
}

 