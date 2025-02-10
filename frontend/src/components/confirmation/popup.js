import React, { useState } from 'react';

export const Popup = ({confirm}) => {
   
const result = (e) =>{
    confirm(e.target.innerText);
}

  return (
    <div class= "popup show" >
        <div class="popupmain">
                <div id="overlay" >
                    <div id="message">
                    <div class="enqimg"><img src="images/exclam.png" alt="yes"/>
                    </div>
                <p id="invert">Are you sure?</p>
                    <div class="btns">
                        <button id="okbtn"  onClick={result}>yes</button>
                        <button id="okbtn"  onClick={result}>no</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

