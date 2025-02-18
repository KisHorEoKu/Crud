import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export const Navdrop = () => {
    const [open, setOpen] = useState(false);
        const navigate = useNavigate();
    

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

    return (
        <div className="bg-gray-200 flex justify-center items-center dark:bg-gray-500">
            <div className="bg-white dark:bg-gray-800  shadow flex justify-center items-center">
                {/* Profile Button */}
                <div
                    onClick={() => setOpen(!open)}
                    className={`relative cursor-pointer ${
                        open ? "border-indigo-700 transform transition duration-300" : ""
                    }`}
                >
                    <div className="flex justify-center items-center gap-3 space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                            <img
                                src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="font-semibold dark:text-white text-gray-900 text-lg">
                            <div className="portext" id="loginname">Hasan Muhammad</div>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute w-46 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5 transition ease-out duration-100 transform opacity-100 scale-100">
                            <ul className="space-y-2 dark:text-white">
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        Account
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Setting
                                    </a>
                                </li>
                                <hr className="dark:border-gray-700" />
                                <li>
                                    <a
                                        href="#"
                                        onClick={destroy}
                                        className="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-red-600"
                                    >
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

