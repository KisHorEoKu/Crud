import React, { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import './navbar.css';
import Cookies from 'js-cookie';


export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const currentpath = location.pathname;
    const destroy = async (e) => {     
        e.preventDefault();
        Cookies.remove('token');
        navigate('/login');

        await fetch('http://localhost:5000/session/destroy', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "cookie": Cookies.get('token') })
        });
    };
    const [respdrop, setRespDrop ] = useState(false);
    const showresdrop = (e) =>{
        e.preventDefault();

        if(window.innerWidth <= 768){ 
            respdrop ? setRespDrop(false) : setRespDrop(true);
        }
    }

   

    return (
        <nav className="navbar">
            <div className="">
                <div className="antialiased bg-gray-100 dark:bg-gray-900">
                    <div className="w-full text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800">
                        <div className="flex flex-col max-w-screen-xl px-4 mx-auto flexed-row md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                            <div className="flex flex-star0t flex-row items-center justify-between p-4">
                                <a href="/dashboard" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white">
                                csentral
                                </a>
                                <div>
                                    
                                </div>
                                
                            </div>
                            {
                                currentpath !== '/login' &&  currentpath !== '/' ? 
                                <>
                                <nav class="topbars">
                                    <div class="topbar">
                                        <div class="topbarmain">
                                            <ul class="tleftul">
                                                <li><a  class={currentpath === '/home' ? 'font-semibold active' : 'font-semibold'}   href="/home">home</a></li>
                                                <li><a class={currentpath === '/updates' ? 'font-semibold active' : 'font-semibold'} href="/updates">updates</a></li>
                                            </ul>
                                        </div>
                                        <div class="userdrop">
                                            <ul class="udropul">
                                                <li>
                                                    <a href="#" onClick={showresdrop}>
                                                    <div class="proimg">
                                                        <img src="/images/man.png"  alt=""/>
                                                    </div>
                                                    <div class="protxt">
                                                        <span id="loginname"></span>
                                                    </div>
                                                    </a>
                                                    <ul class="udropinul">
                                                        <li><a href=""><label><i class="fa-solid fa-gear"></i></label> Settings</a></li>
                                                        <li><a href=""><label><i class="fa-solid fa-pen"></i></label> updates</a></li>
                                                        <li><a href="" onClick={destroy}><label><i class="fa-solid fa-arrow-right-from-bracket"></i></label> logout</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class={respdrop ? 'respnav show' : 'respnav'}>
                                            <div class="respnavmain">
                                                <div class="respnav1">
                                                    <ul>
                                                        <li><a class="font-semibold " href=""> <label><i class="fa-solid fa-house"></i></label> home</a></li>
                                                        <li><a class="font-semibold " href=""><label><i class="fa-solid fa-pen"></i></label>updates</a></li>
                                                        <li><a class="font-semibold " href=""><label><i class="fa-solid fa-gear"></i></label>settings</a></li>
                                                        <li><a class="font-semibold " href="#" onClick={destroy}><label><i class="fa-solid fa-arrow-right-from-bracket"></i></label>Logout</a></li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                                </>:
                                <>
                                </>
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
