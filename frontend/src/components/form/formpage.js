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
    const [popup2 , setPopup2] = useState(false);

  
     

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const errorShow = validateForm(formData);
        setErrors(errorShow);

     
        if(Object.keys(errorShow).length === 0){
            const response = await fetch('http://localhost:5000/form',{
                method :"POST",
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(formData)
            })
            .then((res)=> res.json())
            .then((res)=>{ 
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
              if(res === true){
                showed();
              }else{
                setPopup2(true);



              }
            })
            
        }
        else window.scrollTo({
          top : 0,
          left : 0,
          behavior: 'smooth'
        });


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
        if(!data.full_name.trim()){
          errors.full_name = "Enter the name";
      }
        if(!data.user_name.trim()){
            errors.user_name = "Enter the username";
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
              console.log(first)

              if (!data.email.trim() && ![6, 7, 8, 9].includes(first)) {
                errors.phone = "Invalid number";
              }           
        }
        if(data.gender === '')errors.gender = "Please select gender"
        if(data.sports === '')errors.sports = "Please select gender"
        if(!data.password.trim()) errors.password = "Enter the password";
        if(!data.confirm_password.trim()) errors.confirm_password ="Enter the confirm password"
        if(data.password.trim() !== data.confirm_password.trim()) {errors.confirm_password ="Confirm password does not match"}
        if(data.grade ==='') errors.grade ="Please select the grade";
        return errors;
    }
    const validateField = (e) => {
        const { name, value } = e.target;
        switch (name) {

          case 'full_name':
            if (value !== '') {
              setErrors((prevErrors) => ({
                ...prevErrors,
                full_name: '',
              }));
            }
            break;

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
            if (value !== ''){
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

            case 'gender':
              if (value !== '') {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  gender: '',
                }));
              }
              break;

              case 'sports':
                if (value !== '') {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    sports: '',
                  }));
                }
                break;
      
          default:
            break;
        }
    };
    const offpop2 = (e)=>{
      setPopup2(false)
    }
       

  return (
    
       <div className="main">
                <div class={popup2 ? 'popup show z-top' : 'popup '}><div class="popupmain"><div id="overlay"><div id="message"><div class="enqimg"><img alt="yes" src="images/exclam.png"/></div><p id="invert">The email already registered</p><div class="btns"><button id="okbtn" onClick={offpop2}>OK</button></div></div></div></div></div>
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
                                        style={{borderColor: errors.full_name ? 'red' : ''}}

                                    />
                                    <span>{errors.full_name}</span>
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
                                        style={{borderColor: errors.user_name ? 'red' : ''}}
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
                                        style={{borderColor: errors.email ? 'red' : ''}}

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
                                        style={{borderColor: errors.phone ? 'red' : ''}}

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
                                        onKeyUp={validateField}
                                        style={{borderColor: errors.password ? 'red' : ''}}

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
                                        onKeyUp={validateField}
                                        style={{borderColor: errors.confirm_password ? 'red' : ''}}

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
                                        style={{borderColor: errors.grade ? 'red' : ''}}

                                    >
                                        <option value="" disabled>Select a grade</option>
                                        <option value="10">10</option>
                                        <option value="12">12</option>
                                    </select>
                                    <span>{errors.grade}</span>

                                </div>
                            </div>

                            <div class="collection">
                            <div className="inpset">
                                <div className="intxt">
                                    <h3>Gender</h3>
                                    <span>{errors.gender}</span>
                                </div>
                                <div className="inp12main">
                                    <div className="inp12">
                                    <label class="container">Male
                                        <input type="checkbox"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        onClick={validateField}
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
                                        onClick={validateField}
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
                                        onClick={validateField}
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    </div>
                                </div>
                            </div>

                            <div className="range">
                                <div className="rtxt">
                                    <h3>Sports</h3>
                                    <span>{errors.sports}</span>

                                </div>
                                <div className="rndinpsmain">
                                    <div className="rnginp">
                                        <input
                                            type="checkbox"
                                            name="sports"
                                            value="badminton"
                                            checked={formData.sports.includes('badminton')}
                                            onChange={handleChange}
                                            onClick={validateField}
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
                                            onClick={validateField}
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
                                            onClick={validateField}
                                        />
                                        <label>Volleyball</label>
                                    </div>
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