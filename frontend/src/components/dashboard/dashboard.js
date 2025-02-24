import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popup } from '../confirmation/popup';
import { Preloader1 } from '../preloader/preloader1';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers , deleteUser, updateUser,deleteUsers} from '../../store/actions/formaction.ts';

export const Dashboard = () => {

    const [tabledata, setTabledata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editingData, setEditingData] = useState(null); 
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [ids, setIds] = useState(null);
    const [preloader, setPreloader] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_name1 = location.state?.userData.name;
    const users = useSelector((state)=> state.users)  

  
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await dispatch(getUsers()).unwrap();    
            setFilteredData(response);
            setTabledata(response);
           
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
    }, [dispatch]);
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
        if(e == 'Yes'){

             setShow(false); 
            deleteuserID();
        }
        else{
            setShow(false);
        }
    }
    const userdelete = async(e) =>{
        setShow(true);
        const id = parseInt(e.target.getAttribute('data-id'));
        setIds(id);
    }
    const deleteuserID = async() =>{
        try{
            const response = await dispatch(deleteUsers(ids)).unwrap();
            if(response === true){
                window.location.reload();
            }
            else{
                alert("User have not deleted")
            }
        }
        catch(error){
            console.log(error)
        }
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
        try{
            const response = await dispatch(updateUser(editingData)).unwrap();
            if(response ===  true){
                window.location.reload();
                setEditingData(null); 
            }
            else{

            }
        }
        catch(error){
            console.error("Error updating data:", error);
        }
   
    };
  

    return (
        <div className="tablee">
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
                            <div className="tabless">
                               
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
                                            <button className="savebtn addbtn button" onClick={updateData}>
                                            Save
                                            </button>
                                        </div>
                                        <div>
                                                <button className="cancelbtn delebtn button" onClick={cancelEdit}>
                                                Cancel
                                                </button>
                                        </div>
                                        </>
                                        ) : (
                                            <>
                                             <div>
                                                

                                                <button className="addbtn button" onClick={editFile} data-id={data.id}>
                                                Edit
                                                </button>
                                            </div>
                                            <div>
                                                    

                                                 <button className="delebtn button" onClick={userdelete} data-id={data.id}>
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
