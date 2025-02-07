import React, { useState } from 'react';
import './form.css';


const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    phno:''
  });
  const [dropdown, setDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(null);
  const [showForm, SetShowForm] = useState(1);
  const lang = (e)=>{
    e.preventDefault();
    console.log(dropdown)
    dropdown ? setDropdown(false):setDropdown(true)
       
  }
  const close = (e)=>{
    setDropdown(false); 
    e.preventDefault();
    const langs = e.target.getAttribute('data-lang');
    const lanbx = document.getElementById('lang');
    lanbx.innerText = langs;
         
  }
  const handleFocus = (inputName)=>{
        setIsFocused(inputName);
  }
  document.addEventListener('click',(event)=>{
    if (!event.target.closest('.inp')) {
      setIsFocused('');
    }  
  }); 
  const fb = () => {
    return (
  
          <form action="" method="post" class="reds">
              <div class="inp">
                  <label for="name" class={isFocused ? 'focused' : ''}  >name</label>
                  <input type="text" name="name" class="extr" onFocus={()=> handleFocus('name')} />
              </div>
              <div class="inp">
                  <label for="email"  class={isFocused ? 'focused' : ''}>email</label>
                  <input type="email" name="email" class="extr"/>
              </div>
              <div class="inp" >
                  <label for="Roll no"  class={isFocused ? 'focused' : ''}>roll no</label>
                  <input type="number" name="number" class="extr"/>
              </div>
              <div class="inp checks" >
                  <input type="checkbox" name="rem" class=""/>
                  <label for="Remember me" class="checkos" >remember me</label>                           
              </div>
              <div class="inp fmt" >
                  <input type="submit" name="number" value="Register" class="fsumbit"/>
              </div>
          </form>
    )
  }
  const google = () => {
    return (
     
          <form action="" method="post" class="reds">
              <div class="inp">
                  <label for="name" class={isFocused ? 'focused' : ''}  >name</label>
                  <input type="text" name="name" class="extr" onFocus={()=> handleFocus('name')} />
              </div>
              <div class="inp">
                  <label for="email"  class={isFocused ? 'focused' : ''}>email</label>
                  <input type="email" name="email" class="extr"/>
              </div>
              <div class="inp" >
                  <label for="Roll no"  class={isFocused ? 'focused' : ''}>roll no</label>
                  <input type="number" name="number" class="extr"/>
              </div>
              <div class="inp checks" >
                  <input type="checkbox" name="rem" class=""/>
                  <label for="Remember me" class="checkos" >remember me</label>                           
              </div>
              <div class="inp fmt" >
                  <input type="submit" name="number" value="Register" class="fsumbit"/>
              </div>
          </form>
      
    )
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        
        console.log("form submitted")
      const response = await fetch('http://localhost:5000/user',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      if(response.ok){
        setFormData({
            name:'',
            email:'',
            phno:''
        })
        alert("user has created Sucessfully")
      }
      else{
            alert("user has not created yet")
      }
    } catch (error) {
        console.log("error", error)
    }
    
  }
  const handleChange =(e) =>{
      const {name , value} = e.target;
      setFormData({...formData,[name]:value})
      console.log(formData)
  }
  const validateForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
        errors.username = 'Username is required';
    } else if (data.username.length < 4) {
        errors.username = 'Username must be at least 4 characters long';
    }
    }

  return (
    <div class="main">
          <div class="formmain">
              <div class="formmain1">
                  <div class="formanin11">
                      <div class="fhed">
                          <div class="flogo">
                              <h4>csentrel</h4>
                          </div>
                          <div class="flang">
                              <ul class="flangmain">
                                  <li >
                                      <a href="javascript:;"  class={ dropdown ? 'rot': ''} id="lang"  onClick={lang}>lang </a>
                                      <ul class={ dropdown ? 'langopt show': 'langopt'}>
                                          <li><a href="#" data-lang="en" onClick={close}>en</a></li>
                                          <li><a href="#" data-lang="lat" onClick={close}>lat</a></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="fconttxt">
                          <h4>Welcome Ruix</h4>
                          <h5>Welcome to Ruix. dashboard Community</h5>
                      </div>
                      <div class="fopts">
                        <div class="fopt">
                            <a href="#" class="google">continue with google </a>
                        </div>
                        <div class="fopt">
                            <a href="#" class="fb">continue with facebook </a>
                        </div>
                        <div class="orlan">
                            <span>or</span>
                        </div>
                      </div>
                  </div>
                  <div class="formint">
                    {/* {showForm === 1 ? fb() : google()} */}
                        <form class="reds" onSubmit={handleSubmit}>
                            <div class="inp">
                                <label for="name" class={isFocused ? 'focused' : ''}  >name</label>
                                <input type="text" value={formData.name} onChange={handleChange}  name="name" class="extr" required  onFocus={()=> handleFocus('name')} />
                                <span></span>
                            </div>
                            <div class="inp">
                                <label for="email"  class={isFocused ? 'focused' : ''}>email</label>
                                <input type="email" value={formData.email} onChange={handleChange} name="email" class="extr" required onFocus={()=> handleFocus('email')}/>
                            </div>
                            <div class="inp" >
                                <label for="number"  class={isFocused ? 'focused' : ''}>number</label>
                                <input type="number" value={formData.phno} onChange={handleChange} name="phno" class="extr" required onFocus={()=> handleFocus('phno')}/>
                            </div>
                            <div class="inp checks" >
                                <input type="checkbox" name="rem" class=""/>
                                <label for="Remember me" class="checkos" >remember me</label>                           
                            </div>
                            <div class="inp fmt" >
                                <input type="submit"  name="number" value="Register" class="fsumbit"/>
                            </div>
                        </form>
                  </div>
                 
              </div>
              <div class="formmain2">
                  <img src="images/Image.jpg" alt="images"/>
              </div>
          </div>
          
      </div>
  );
};

export default Form;
