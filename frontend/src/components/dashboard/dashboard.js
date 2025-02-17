import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popup } from '../confirmation/popup';
import { Preloader1 } from '../preloader/preloader1';
import { Edit } from '../form/edit';
export const Dashboard = () => {
    const [tabledata, setTabledata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [ids, setIds] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [edit,setEdit ] = useState(false);
    const [preloader, setPreloader] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/form/Getusers', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                setTabledata(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setPreloader(false);
        }, 1000);
    }, []);

    const search = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        
        if (query === '') {
            setFilteredData(tabledata);
        } else {
            const filtered = tabledata.filter(user =>
                user.full_name.toLowerCase().includes(query) ||
                user.user_name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        }
    };

    if (preloader) {
        return <Preloader1 />;
    }
    const editFile = async (e)=>{
        const value = e.target.getAttribute('data-id');
        const response = await fetch('',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify()
        })
    }
    const confirm = (e) =>{
        if(e == 'yes'){
            setDeletes(true) ; setShow(false); 
            deleteuser();
        }
        else{
            setDeletes(false) ; setShow(false);
        }
    }
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

    return (
        <div className="table">
            {edit ? <Edit /> : ' '}
            <div className="tablemain">
                <div className="tablemain2">
                    <div className="tblemain">
                        <div className="tb2hed">
                            <div className="tb2hed1">
                                <h4>Customers</h4>
                            </div>
                            <div className="tb2hed2">
                                <ul className="tb2hed2ul">
                                    <li>
                                        <input type="text" placeholder="Search..." value={searchQuery} onChange={search} />
                                    </li>
                                    <li>
                                        <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={() => navigate('/')}><i className="fa-solid fa-plus"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tb2body">
                            <div className="tabless">
                                <div className="rhed">
                                    <div>Full name</div>
                                    <div>User name</div>
                                    <div>Phone</div>
                                    <div className="wid1 uppc">Email</div>
                                    <div>Grade</div>
                                    <div>Sports</div>
                                    <div>Gender</div>
                                    <div>Edit</div>
                                    <div>Delete</div>
                                </div>
                                {
                                    filteredData.map((data, index) => (
                                        <div key={data.id} className={index % 2 === 0 ? "rhed1" : "rhed2"}>
                                            <div>{data.full_name}</div>
                                            <div>{data.user_name}</div>
                                            <div>{data.phone}</div>
                                            <div className="wid1">{data.email}</div>
                                            <div>{data.grade}</div>
                                            <div class="spt">{data.sports.map((ele, i) => <div key={i}>{ele}</div>)}</div>
                                            <div>{data.gender}</div>
                                            <div><button className="addbtn" onClick={editFile} data-id={data.id}>Edit</button></div>
                                            <div><button className="delebtn"  onClick={userdelete} data-id={data.id}>Delete</button></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show ?  <Popup confirm={confirm}/> : ''}
        </div>
    );
};
