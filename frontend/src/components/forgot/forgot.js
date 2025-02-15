import React, { useState } from 'react';
import './forgot.css';

export const Forgot = ({type, setfors}) => {
      const [show , setShow] = useState(true);
      const [error , setError] = useState({
        errors:''
      });
      const[popup , setPop] = useState(false);
      const [otps , setOpts] = useState({
        first: '',
        second:'',
        third:'',
        fourth:''
      });
      const getOtp = async (e)=>{
      const value = document.getElementById('phnum').value;

      const data = {
        phnumber: value
      }
    
    console.log(otps)

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
            setPop(true)
          }
          else{
            setError({errors : "Invalid number"})


          }
        })
  
      }catch(error){
  
      }
    }

    const verifyotp = async(e)=>{
          e.preventDefault();
        
        const Validopt = Object.values(otps).join(''); 
        const validopsend ={ otp:parseInt(Validopt)}
        console.log(validopsend)
        const response = await fetch('http://localhost:5000/form/otp/validate',{
          method:"POST",
          headers:{
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(validopsend)
        }).then((res)=> res.json())
        .then((data)=>{
          if(data === true){
            setShow(false)
          }else{
            setError({errors : "Entered OTP is wrong"})

          }
        })
    }
    const handleOtpChange = (e, index) => {
      const newOtp = {...otps};
      newOtp[index] = e.target.value; 
      setOpts(newOtp);
  };
  const offpop = (e)=>{
    setPop(false)
  }
  
    
  return (
    <div>
        <div class={popup ? 'popup show z-top' : 'popup '}><div class="popupmain"><div id="overlay"><div id="message"><div class="enqimg"><img alt="yes" src="images/yes.png"/></div><p id="invert">Otp has send in email</p><div class="btns"><button id="okbtn" onClick={offpop}>OK</button></div></div></div></div></div>
        <div class={show ? 'popup show ' : 'popup '}>
         <div class="popupmain flexed">  
         <form class="otp-Form" onSubmit={verifyotp} >
              <div class="form-ipnss">
                    <div class="form-ipn">
                          <input  placeholder='Enter your mobile number'  maxlength="10" type="number" class="" id="phnum"/>
                    </div>
                    <div class="form-btn">
                            <button class="verifyButton1" onClick={getOtp} type="submit">Get OTP</button>
                    </div>
                   
                </div>
                <div class="form-inpf">
                          <span>{error.errors}</span>
                    </div>
                <span class="mainHeading">Enter OTP</span>
                <p class="otpSubheading">We have sent a verification code to registered Email</p>
                <div class="inputContainer">
                    <input required="required"   maxlength={1} type="number" class="otp-input" id="otp-input1"  onInput={(e) => {
                    if (e.target.value.length > 1) {e.target.value = e.target.value.slice(0, 1);}}} 
                  onChange={(e) => handleOtpChange(e,'first' )} />
                    <input required="required" maxlength="1" type="number" class="otp-input" id="otp-input2"
                     onInput={(e) => {
                      if (e.target.value.length > 1) {e.target.value = e.target.value.slice(0, 1);}}} 
                     onChange={(e) => handleOtpChange(e, 'second')}/>
                    <input required="required" maxlength="1" type="number" class="otp-input" id="otp-input3"
                     onInput={(e) => {
                      if (e.target.value.length > 1) {e.target.value = e.target.value.slice(0, 1);}}} 
                     onChange={(e) => handleOtpChange(e, 'third')}/>
                    <input required="required" maxlength="1" type="number" class="otp-input" id="otp-input4"
                     onInput={(e) => {
                      if (e.target.value.length > 1) {e.target.value = e.target.value.slice(0, 1);}}} 
                     onChange={(e) => handleOtpChange(e, 'fourth')}/> 
                </div>
                    <button class="verifyButton"  type="submit">Verify</button>
                    <button class="exitBtn" onClick={(e) => { e.preventDefault(); setShow(false);setfors(false) }}>×</button>
                    {/* <p class="resendNote">Didn't receive the code? <button class="resendBtn">Resend Code</button></p> */}

          </form>                                             
         </div>           
        </div>
    </div>
   
  )
}
