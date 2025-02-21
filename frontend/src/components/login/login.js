import React, { useState, useEffect } from 'react';
import './login.css'; 
import { Common } from '../common/common';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Forgot } from '../forgot/forgot';
import { Preloader1 } from '../preloader/preloader1';

export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const[errors, setError] = useState({
    testcase :''
  });
  const[forshow , setFor] = useState(false);
  const [allow, setAllow] = useState(false);
  const  navigate = useNavigate();
  const [preloader, setPreloader] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
        setPreloader(false);
    }, 1000);
  }, []);
  if (preloader) {
    return <Preloader1 />;
  }
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
      const data = await response.json().catch((err) => {
        setError({ testcase: 'Invalid response format' });
      });     

      if(data && data.sessionIds){
        setAllow(true);
        // console.log("went in if part") ;
        navigate('/dashboard');
        Cookies.set('token',`${data.sessionIds}`,{ expires: 3 / 1440, path: '', secure: true, sameSite: 'strict' });
        return;
      } 
      else{
        const allowse = userData.email.includes('@');
        // console.log(allowse)
        if(userData.email === '' && userData.password === '')setError({ testcase: 'Enter your email and password' }); 
        else if(!allowse) setError({ testcase: 'Email includes @' });
        else if(userData.email === '') setError({ testcase: 'Enter your email' });            
        else if(userData.password === '') setError({ testcase: 'Enter your password' }); 
        else setError({ testcase: 'Entered credentials are wrong' });  
      }
    } 
    catch (error) {
      console.log("error is throwing check for updates")
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
  const forgot = async (e)=> {
    e.preventDefault();
    console.log(forshow)
    setFor(true);  
    
    

  }
    

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
                <span id="textred">{errors.testcase}</span>
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
                  <a href="#" onClick={forgot}>Forgot password?</a>
                </div>
                <div className="forinp">
                  <a href="#" onClick={e =>{ e.preventDefault() ;navigate('/')}}>Get started by register</a>
                </div>
                <div className="lsubmit">
                  <button type="submit"class="btnfire">Sign in</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="formains2">
          <div className="formain21">
            <div className="formain211">
             <img src="/images/paint.jpg  " alt=""/>
            </div>
          </div>
        </div>
      </div>
      {forshow ? <Forgot setfors={setFor} type='1' /> : ' '}
    </div>
  );
};
