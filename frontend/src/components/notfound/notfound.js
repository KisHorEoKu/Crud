import React from 'react'
import './notfound.css';
import { useNavigate } from 'react-router-dom';

export const Notfound = () => {

    const navigate = useNavigate();
    const travelHome = (e)=>{
        e.preventDefault();
        navigate('/dashboard')
    }
    


  return (
    <div class="notfound">
        <div class="notfoundmain">
            <div class="ntmain1">
                <div class="ntmain11">
                    <div class="nt1txt">
                        <h5>404</h5>
                   </div>
                   <div class="nt1cont">
                        <div class="nt1contxt1">
                            <h5>page not found</h5>
                        </div>
                        <div class="nt1contxt2">
                            <h5>Sorry, we couldn’t find the page you ‘re looking for </h5>
                        </div>
                        <div class="nt1contxt3">
                            <a href="#" class="clickbtn" onClick={travelHome}>back to home</a>
                        </div>
                   </div>
                </div>
               
            </div>
            <div class="ntmain2">
                <div class="nt2img">
                    <img src="images/Rectangle 3.jpg" alt="Rectangle"/>
                </div>
            </div>  
        </div>
    </div>
  )
}
