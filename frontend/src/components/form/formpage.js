import React, { useState } from 'react'
import { Confirmation } from '../confirmation/confirmation';
 const Formpage = () => {

    const [formData ,setFormData] = useState({
        full_name: '',
        user_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        grade: '',
        gender: '',
        sports: '',

    })
    const [errors , setErrors] = useState({});
    const [message , setMessage] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const errorShow = validateForm(formData);
        setErrors(errorShow);
        

        if(Object.keys(errorShow).length === 0){
            console.log(formData)
            const response = await fetch(' http://localhost:5000/form',{
                method :"POST",
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(formData)
            })
            if(response.ok){
                setFormData({
                    full_name: '',
                    user_name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirm_password: '',
                    grade: '',
                    gender: '',
                    sports: '',
                })
               
                showed();
                
            }
            else{
              
            }
        }
       
        

    }
    const showed = (e)=>{console.log("called"); setMessage(true)}
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
       
    
        if (type === 'checkbox' && name ==='sports') {
          setFormData(prevState => {
            let updatedSports = [...prevState.sports];
    
            if (checked) {
              updatedSports.push(value);
            } else {
              updatedSports = updatedSports.filter(sport => sport !== value);
            }
    
            return { ...prevState, sports: updatedSports };
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    const validateForm = (data) =>{
    
        const errors = {};
        if(!data.user_name.trim()){
            errors.user_name = "Enter the name";
        }
        else if(data.user_name.length < 4){
            errors.user_name = "User name should more than 4 character";
        }

        if(!data.email.trim()){
            errors.email = "Enter the email";
        }
        else if(!data.email.trim()){
           const result = data.email.includes('@');
           if(result) errors.email = "Email should have @";
        }

        if(!data.phone.trim()) errors.phone ="Enter the number";
        else if (data.phone.length != 10){
          errors.phone ="Number should be 10 digits";
        }
        else if(data.phone.length == 10){
          let result ="" +data.phone;
          const first = parseInt(result.charAt(0));
          if(!first.includes(6,7,8,9)){
              errors.phone ="Invalid number";
          }
    }

        if(!data.password.trim()) errors.password = "Enter the password";
        if(!data.confirm_password.trim()) errors.confirm_password ="Enter the confirm password"
        if(data.password.trim() !== data.confirm_password.trim()) {
            alert("confirm password does not match")
            errors.confirm_password ="confirm password does not match"
        }
        
        if(data.grade ==='') errors.grade ="Please select the grade";
        

        return errors;
    }

    const validateField = (e) => {
        const { name, value } = e.target;
      
        switch (name) {
          case 'user_name':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                user_name: '',
              }));
            }
            break;
      
          case 'email':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: '',
              }));
            }
            break;
      
          case 'phone':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                phone: '',
              }));
            }
            break;
      
          case 'password':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
              }));
            }
            break;
      
          case 'confirm_password':
            if (value === '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: 'Please confirm your password.',
              }));
            } else if (value !== formData.password) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: 'Passwords do not match.',
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: '',
              }));
            }
            break;
      
          case 'grade':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                grade: '',
              }));
            }
            break;
      
          default:
            break;
        }
    };
      
   

  return (
    
       <div className="main">
            <div className="form">
                <div className="formmain">
                    <div className="formhed"></div>
                    <div className="formbdy">
                        <div className="ftxt">
                            <h3>Registration</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="inpfild">
                                <div className="inp">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        onKeyUp={validateField}
                                    />
                                    {/* <span>{errorss.full_name}</span> */}
                                </div>
                                <div className="inp">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        onKeyUp={validateField}
                                    />
                                    <span>{errors.user_name}</span>
                                </div>
                                <div className="inp">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        onKeyUp={validateField}
                                    />
                                    <span>{errors.email}</span>
                                </div>
                                <div className="inp">
                                    <label>Phone Number</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your number"
                                        onKeyUp={validateField}
                                    />
                                    <span>{errors.phone}</span>
                                </div>
                                <div className="inp">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                    <span>{errors.password}</span>
                                </div>
                                <div className="inp">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                    />
                                    <span>{errors.confirm_password}</span>
                                </div>
                                <div className="inp">
                                    <label>Grade</label>
                                    <select
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        onClick={validateField}
                                    >
                                        <option value="" disabled>Select a grade</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                    </select>
                                    <span>{errors.grade}</span>

                                </div>
                            </div>

                            <div className="inpset">
                                <div className="intxt">
                                    <h3>Gender</h3>
                                </div>
                                <div className="inp12main">
                                    <div className="inp12">
                                    <label class="container">Male
                                        <input type="checkbox"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    </div>
                                    <div className="inp12">
                                    <label class="container">Female
                                        <input type="checkbox"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    </div>
                                    <div className="inp12">
                                    <label class="container">Prefer not to say
                                        <input type="checkbox"
                                        name="gender"
                                        value="not"
                                        checked={formData.gender === 'not'}
                                        onChange={handleChange}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    </div>
                                </div>
                            </div>

                            <div className="range">
                                <div className="rtxt">
                                    <h3>Sports</h3>
                                </div>
                                <div className="rndinpsmain">
                                    <div className="rnginp">
                                        <input
                                            type="checkbox"
                                            name="sports"
                                            value="badminton"
                                            checked={formData.sports.includes('badminton')}
                                            onChange={handleChange}
                                        />
                                        <label>Badminton</label>
                                    </div>
                                    <div className="rnginp">
                                        <input
                                            type="checkbox"
                                            name="sports"
                                            value="hockey"
                                            checked={formData.sports.includes('hockey')}
                                            onChange={handleChange}
                                        />
                                        <label>Hockey</label>
                                    </div>
                                    <div className="rnginp">
                                        <input
                                            type="checkbox"
                                            name="sports"
                                            value="volley ball"
                                            checked={formData.sports.includes('volley ball')}
                                            onChange={handleChange}
                                        />
                                        <label>Volleyball</label>
                                    </div>
                                </div>
                            </div>

                            <div className="submitinp">
                                <button type="submit" className="fsubmit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            { message ? <Confirmation type="1"/> : ''}
        </div>

  )
}

export default Formpage