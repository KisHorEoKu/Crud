import React,{ useState ,useEffect}  from 'react';
import './formmain.css'; 
import { Common } from '../common/common';
import { useNavigate} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Forgot } from '../forgot/forgot';
import { Preloader1 } from '../preloader/preloader1';


export const Formmain = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
      });
      const[errors, setError] = useState({
        testcase :''
      });
      const[forshow , setFor] = useState(false);
      const [allow, setAllow] = useState(false);
      const [preloader, setPreloader] = useState(true);
      const  navigate = useNavigate();

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
            if(userData.email === '' && userData.password === '')setError({ testcase: 'Enter your email and pasword' }); 
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
    <div className='fmain'>
         <form class="formes" onSubmit={handleLoginSubmit}>
            <div class="fohed">
                <h3>Account Login</h3>
            </div>
            <div class="errtextfor">
                <span id="textred">{errors.testcase}</span>              
            </div>
        <div class="flex-column mtsop">
            <label>Email </label></div>
            <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                    <input
                      type="text"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />           
                     </div>

        <div class="flex-column">
            <label>Password </label></div>
            <div class="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>        
            <input
                      type="password"
                      id="passcode"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
            </div>

        <div class="flex-row">  
            <span class="span"  onClick={forgot}>Forgot password?</span>
        </div>
        <button class="button-submit">Sign In</button>
        <p class="p" onClick={e =>{ e.preventDefault() ;navigate('/')}}>Don't have an account? <span class="span">Sign Up</span>
        </p>
    </form>
    {forshow ? <Forgot setfors={setFor} type='1' /> : ' '}

    </div>
   
  )
}
