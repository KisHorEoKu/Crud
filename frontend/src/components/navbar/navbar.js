import React, { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';

import { Navdrop } from '../dropdown/navdrop';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const currentpath = location.pathname;
    console.log(currentpath)

   

    return (
        <nav className="navbar">
            <div className="">
                <div className="antialiased bg-gray-100 dark:bg-gray-900">
                    <div className="w-full text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800">
                        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                            <div className="flex flex-row items-center justify-between p-4">
                                <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white">
                                csentral
                                </a>
                                <button 
                                    className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" 
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                        {menuOpen ? (
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                        ) : (
                                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"/>
                                        )}
                                    </svg>
                                </button>
                            </div>
                            {
                                currentpath !== '/login' &&  currentpath !== '/' ? 
                                <>
                                <nav className={`flex-col flex-grow ${menuOpen ? "flex" : "hidden"} pb-4 md:pb-0 md:flex  flexesd md:justify-end md:flex-row`}>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" href="#">Blog</a>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" href="#">Portfolio</a>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" href="#">About</a>
                                <a className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600" href="#">Contact</a>
                                
                                {/* Dropdown */}
                                <div className="relative">
                                  <Navdrop/>
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
