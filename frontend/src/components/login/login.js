import React, { useState } from 'react';
import './login.css'; // Assuming you already have a CSS file
import { Common } from '../common/common';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [allow, setAllow] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/form/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data.success); 

      if(data.success === true){
        setAllow(true);
        Navigate('/dashboard');

        const session = (e)=>{
            
        }

      } else {  

      }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const revealPassword = (e) => {
    const pass = document.getElementById('passcode');
    e.preventDefault();
    if (pass.type === 'password') {
      pass.type = 'text';
    //   e.target.innerHTML = '<i class="fa-regular fa-eye"></i>'; 
    } else {
      pass.type = 'password';
    //   e.target.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'; 
        }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <div className="forms">
      <div className="formains">
        <div className="formains1">
          <div className="formains11">
            <form onSubmit={handleLoginSubmit}>
              <div className="formain1hed">
                <h4>Sign in</h4>
              </div>
              <div className="form11body">
                <span></span>
                <div className="inpmain">
                  <div className="inp1">
                    <label htmlFor=""><i className="fa-regular fa-envelope"></i></label>
                    <input
                      type="text"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="inp1">
                    <label htmlFor=""><i className="fa-solid fa-lock"></i></label>
                    <input
                      type="password"
                      id="passcode"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <a href="#" onClick={revealPassword} className="eye">
                      <i className="fa-regular fa-eye-slash"></i>
                    </a>
                  </div>
                </div>
                <div className="forinp">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="lsubmit">
                  <button type="submit">Sign in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="formains2">
          <div className="formain21">
            <div className="formain211">
              <h3>Hello, friend</h3>
              <p>Enter your personal details and start your journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
