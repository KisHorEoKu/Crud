import React, { useState } from 'react';

export const Popup = ({confirm}) => {
   
const result = (e) =>{
    const value = e.target.getAttribute('data-value');
    confirm(value);
}

  return (
    <div class= "popup show" >
        <div class="popupmain">
                <div id="overlay" >
                    <div id="message">
                    <div class="enqimg"><img src="images/exclam.png" alt="yes"/>
                </div>
                <p id="invert">Do you really want to delete the user?</p>
                    <div class="btns">
                        <button id="okbtn" data-value={'Yes'} class="color-1"  onClick={result}>yes, delete the user</button>
                        <button id="okbtn" data-value={'No'}  class="color-2" onClick={result}>no, not this time</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

