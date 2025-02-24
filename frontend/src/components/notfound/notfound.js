import React, { useEffect , useState}from 'react'
import './notfound.css';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { getUsers } from '../../store/actions/formaction.ts';

export const Notfound = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const travelHome = (e)=>{
        e.preventDefault();
        navigate('/dashboard')
    }
    const users = useSelector((state)=> state.users)
    useEffect( ()=>{
        const getUser= async() =>{
            const response = await dispatch(getUsers());

        }
        getUser();
    },[dispatch])
 


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
                            <a href="#" class="clickbtn" onClick={travelHome}>Back to home</a>
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
