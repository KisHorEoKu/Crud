import React, { useState } from 'react'
import './reset.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Reset = () => {
        const [params]  = useSearchParams();
        const value = params.get('token');
        const navigate = useNavigate();

        // console.log(value)
        const [pass, setPass] = useState({
            password: '',
            confirm_password :'',
            token :value
        })
        const [error, setError] = useState({
            message : ''
        })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setPass({
              ...pass,
              [name]: value
            });
          };

        const sumbitHandle = async(e) =>{
            e.preventDefault();
            try{
                if(pass.password !== pass.confirm_password ) {
                    setError({message:'Password does not match'})
                    console.log(error.message)
                    return
                } 
                else if(pass.password ==='' && pass.confirm_password ===''){
                    setError({message:'Password should not be empty '})
                }
                else{
                    const response = await fetch('http://localhost:5000/form/token/validate',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({"token":pass.token,"password":pass.password, "confirm_password" :pass.confirm_password})
                    }).then((res)=> res.json())
                    .then((res) =>{
                        if(res === false){
                            setError({message:'Session has expired'})
                        }else{
                            setPop(true)
                        }
                        console.log(res)
                    })
                }
               
            }
            catch(error){
                console.log(error)
            } 
        }
        const [popup , setPop] = useState(false);
        const offpop = (e)=>{
            setPop(false);
            navigate('/login')

        }

       
  return (
    <div class="formset">
            <div class={popup ? 'popup show z-top' : 'popup '}><div class="popupmain"><div id="overlay"><div id="message"><div class="enqimg"><img alt="yes" src="images/yes.png"/></div><p id="invert">Password reseted </p><div class="btns"><button id="okbtn" onClick={offpop}>OK</button></div></div></div></div></div>
        <div class="formmain2">
            <form class="forms1" onSubmit={sumbitHandle}>
                <p class="form-title">Reset password</p>

                <div class="error">
                    <span>{error.message}</span>
                </div>
                    <div class="input-container">
                    <input type="text" onChange={handleChange} placeholder="Enter your password" name="password"/>
                    <span>
                    </span>
                </div>
                <div class="input-container">
                <input type="text" onChange={handleChange} placeholder="Confirm password" name="confirm_password"/>
                </div>
                <div class="btntank">
                        <button type="submit" class="submit">Sign in</button>
                </div>

                   
            </form>
        </div>
    </div>
    
   

  )
}
