import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popup } from '../confirmation/popup';
import { Preloader1 } from '../preloader/preloader1';
import { Edit } from '../form/edit';

export const Dashboard = () => {

    const [tabledata, setTabledata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editingData, setEditingData] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [ids, setIds] = useState(null);
    const [deletes, setDeletes] = useState(false);
    const [edit,setEdit ] = useState(false);
    const [preloader, setPreloader] = useState(true);
    const location = useLocation();
    const user_name1 = location.state?.userData.name;
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/form/Getusers', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await res.json();
                setTabledata(data);
                setFilteredData(data);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
        const ele = document.getElementById('loginname');
        const value = ele.textContent;
        console.log(value)
        if(value === 'Login') window.location.reload();
       
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
    const deleteuser = async() =>{

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
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setEditingData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }

    const editFile = (e) => {
        const id = e.target.getAttribute("data-id");
        const dataToEdit = filteredData.find((item) => item.id === parseInt(id));
        setEditingData({ ...dataToEdit }); 
    };
    const cancelEdit = () => {
        setEditingData(null); 
    };
    const updateData = async () => {
        console.log(editingData)
        try {
          const response = await fetch(`http://localhost:5000/dashboard/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingData),
          });
          const updatedData = await response.json();
          setFilteredData(
            filteredData.map((item) =>
              item.id === updatedData.id ? updatedData : item
            )
          );
          setEditingData(null); 
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };
  

    return (
        <div className="tablee">
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
                                {filteredData.map((data, index) => (
                                    <div key={data.id}  style={editingData && editingData.id === data.id ?  {borderColor: '#000',border: '1px solid'} : {}} className={index % 2 === 0 ? "rhed1" : "rhed2"}>
                                    <div>
                                        <input
                                        name="full_name"
                                        value={editingData && editingData.id === data.id ? editingData.full_name : data.full_name}
                                        onChange={handleInputChange}
                                        readOnly={!editingData || editingData.id !== data.id}
                                        />
                                    </div>
                                    <div>
                                        <input
                                        name="user_name"
                                        value={editingData && editingData.id === data.id ? editingData.user_name : data.user_name}
                                        onChange={handleInputChange}
                                        readOnly={!editingData || editingData.id !== data.id}
                                        />
                                    </div>
                                    <div>
                                        <input
                                        name="phone"
                                        value={editingData && editingData.id === data.id ? editingData.phone : data.phone}
                                        onChange={handleInputChange}
                                        readOnly={!editingData || editingData.id !== data.id}
                                        />
                                    </div>
                                    <div className="wid1">
                                        <input
                                        name="email"
                                        value={editingData && editingData.id === data.id ? editingData.email : data.email}
                                        onChange={handleInputChange}
                                        readOnly={!editingData || editingData.id !== data.id}
                                        />
                                    </div>
                                    <div>
                                        <input
                                        name="grade"
                                        value={ data.grade}
                                        readOnly={true}
                                        />
                                    </div>
                                    <div className="spt">
                                        {data.sports.map((ele, i) => (
                                        <div key={i}>{ele}</div>
                                        ))}
                                    </div>
                                    <div>
                                        <input
                                        name="gender"
                                        value={ data.gender}
                                        readOnly={true}
                                        />
                                    </div>
                                    
                                        {editingData && editingData.id === data.id ? (
                                        <>
                                        <div>
                                            <button className="savebtn" onClick={updateData}>
                                            Save
                                            </button>
                                        </div>
                                        <div>
                                                <button className="cancelbtn" onClick={cancelEdit}>
                                                Cancel
                                                </button>
                                        </div>
                                        </>
                                        ) : (
                                            <>
                                             <div>
                                                <button className="addbtn" onClick={editFile} data-id={data.id}>
                                                Edit
                                                </button>
                                            </div>
                                            <div>
                                                 <button className="delebtn" onClick={userdelete} data-id={data.id}>
                                                Delete
                                                </button>
                                            </div>
                                            </>
                                        )}
                                    
                                    
                                       
                                    
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show ?  <Popup confirm={confirm}/> : ''}
        </div>
    );
};
