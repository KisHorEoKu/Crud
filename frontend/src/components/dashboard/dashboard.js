import React, { useEffect } from 'react';
import './dashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popup } from '../confirmation/popup';
import { Common} from '../common/common';

export const  Dashboard = () => {

    const [tabledata ,setTabledata] = useState([]);
    const [show , setShow] = useState(false);
    const [ids , setIds] = useState(false);

    const [deletes , setDeletes] = useState(false);
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const options = { month: "long", day: "numeric", year: "numeric" };

    useEffect(() => {
        const datas = async ()=>{
            const res = await fetch('http://localhost:5000/form/Getusers',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const data = await res.json();
            setTabledata(data);
        }
        datas();
    },[]);
    const confirm = (e) =>{
        if(e == 'yes'){
            setDeletes(true) ; setShow(false); 
            deleteuser();
        }
        else{
            setDeletes(false) ; setShow(false);
        }
    }
    const userinfo = (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
      
        fetch(`http://localhost:5000/form/getuser/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => response.json())  
        .then((data) => {
          console.log(data);  
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
      };
      
    const userdelete = async(e) =>{

        setShow(true);
        const id = parseInt(e.target.getAttribute('data-id'));
        setIds(id);
    }
    const deleteuser =async() =>{
        const res = await fetch(`http://localhost:5000/form/delete`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"id":ids})
            
        })
        .then((res)=>{
           window.location.reload();
        })
    }
    const Backtoadd = ()=>{
            navigate('/');
    }

   

  return (
          <div class="table">
            <div class="tablemain">
                
                
                <div class="tablemain2">
                    <div class="tblemain">
                            <div class="tabledate">
                                    <h5>{currentDate.toLocaleDateString(undefined, options)}</h5>
                            </div>
                        <div class="tb2hed">
                            <div class="tb2hed1">
                                <h4>customers</h4>
                            </div>
                            <div class="tb2hed2">
                                <ul class="tb2hed2ul">
                                    <li><input type="text" /></li>
                                    <li><a href="#"><i class="fa-solid fa-magnifying-glass"></i></a></li>
                                    <li><a href="#" onClick={Backtoadd}><i class="fa-solid fa-plus"></i></a></li>
                                </ul>
                            </div>

                        </div>
                        <div class="tb2body">
                            <div class="tabless">
                                <div class="rhed">
                                    <div>Full name</div>
                                    <div>User name</div>
                                    <div>Phone</div>
                                    <div class="wid1 uppc">Email</div>
                                    <div>Grade</div>
                                    <div>Sports</div>
                                    <div>Gender</div>
                                    <div>Edit </div>
                                    <div>Delete</div>
                                </div>

                                {
                                    tabledata.map((data ,index )=>{
                                        return(
                                            <div class={index % 2 == 0 ?"rhed1":"rhed2"}>
                                                <div>{data.full_name}</div>
                                                <div>{data.user_name}</div>
                                                <div>{data.phone}</div>
                                                <div class="wid1">{data.email}</div>
                                                <div>{data.grade}</div>
                                                <div>{data.sports.map((ele)=>{
                                                    return(
                                                        <div>{ele}</div>
                                                    )
                                                })}</div>
                                                <div>{data.gender}</div>
                                                <div><button class="addbtn" data-id={data.id} onClick={userinfo}>Edit</button></div>
                                                <div><button class="delebtn" data-id={data.id} onClick={userdelete}>Delete</button></div>
                                            </div>
                                        )
                                    })
                                }

                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {show ?  <Popup confirm={confirm}/> : ''}
        </div>
  )
}

  