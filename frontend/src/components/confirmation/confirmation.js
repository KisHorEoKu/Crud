import React, { useState } from 'react'

export const Confirmation = ({type}) => {
    const [show , setShow] = useState(true);
    const hide = (e) =>{
        setShow(false)
    }
  return (
    <div class= {type === "1" ? 'popup show': 'popup'} >
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

