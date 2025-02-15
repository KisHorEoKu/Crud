import React, { useState } from 'react'
import './reset.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Reset = () => {
        const [params]  = useSearchParams();
        const value = params.get('token');
        const navigate = useNavigate();

        console.log(value)
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
                if(pass.password !== pass.confirm_password)  return
                const response = await fetch('http://localhost:5000/form/token/validate',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({"token":pass.token,"password":pass.password, "confirm_password" :pass.confirm_password})
                }).then((res)=> res.json())
                .then((res) =>{
                    if(res === false){
                    }else{
                        navigate('/login')
                    }
                    console.log(res)
                })
            }
            catch(error){
                console.log(error)
            } 
        }

       
  return (
    <div class="formset">
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
