import React, { useState } from 'react';
import './forgot.css';

export const Forgot = ({type, setfors}) => {
      const [show , setShow] = useState(true);
      const [error , setError] = useState({
        errors:''
      });
      const getOtp =async (e)=>{
      const value = document.getElementById('phnum').value;
      const data = {
        phnumber: value
      }

      try{
        const response = await fetch('http://localhost:5000/form/otp',{
          method: "POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then((res)=> res.json())
        .then((data)=>{
          console.log(data)
          if(data === true){
            setError({errors : ''})
          }
          else{
            setError({errors : "Invalid number"})


          }
        })
  
      }catch(error){
  
      }
    }
    
  return (
    <div class={show ? 'popup show ' : 'popup '}>
         <div class="popupmain flexed">  
         <form class="otp-Form">
              <div class="form-ipnss">
                    <div class="form-ipn">
                          <input required="required" placeholder='Enter your mobile number'  maxlength="10" type="number" class="" id="phnum"/>
                    </div>
                    <div class="form-btn">
                            <button class="verifyButton1" onClick={getOtp} type="submit">Get OTP</button>
                    </div>
                   
                </div>
                <div class="form-inpf">
                          <span>{error.errors}</span>
                    </div>
                <span class="mainHeading">Enter OTP</span>
                <p class="otpSubheading">We have sent a verification code to your mobile number</p>
                <div class="inputContainer">
                    <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input1"/>
                    <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input2"/>
                    <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input3"/>
                    <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input4"/> 
                </div>
                    <button class="verifyButton" type="submit">Verify</button>
                    <button class="exitBtn" onClick={(e) => { e.preventDefault(); setShow(false);setfors(false) }}>×</button>
                    <p class="resendNote">Didn't receive the code? <button class="resendBtn">Resend Code</button></p>

                </form>                                             
         </div>           
    </div>
  )
}
