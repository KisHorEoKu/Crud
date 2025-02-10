import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Confirmation = ({type}) => {
    const [show , setShow] = useState(true);
    const navigate = useNavigate();
    const hide = (e) =>{
        console.log("hided");
        setShow(false);
        navigate('/login');
    }
  return (
    <div class= {show ? 'popup show': 'popup'} >
        <div class="popupmain">
                <div id="overlay" >
                    <div id="message">
                    <div class="enqimg"><img src="images/yes.png" alt="yes"/>
                    </div>
                <p id="invert">Student Registered sucessfully</p>
                <button id="okbtn" onClick={hide}>OK</button>
                </div>
            </div>
        </div>
    </div>
  )
}

