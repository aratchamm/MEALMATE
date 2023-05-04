import React, { Component,useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './Login.css';
import axios from "axios";

function Signup()
{

  useEffect(() => {
    localStorage.clear();
    document.body.classList.add('LOGIN');

    return () => {
        document.body.classList.remove('LOGIN');
    }
}, []);


  const [showPopupAlready, setShowPopupAlready] = useState(false);
  const [showPopupReqiured, setShowPopupReqiured] = useState(false);
  const [showPopupSuccessfully, setShowPopupSuccessfully] = useState(false);

  const navigate = useNavigate()
  const [signupUser, setSignupUser] = useState({
    username:"",
    password:"",
    phone:"",
  })

  async function SingUpHandler(){
    if(signupUser.username==""||
    signupUser.password==""||
    signupUser.phone==""){
      console.log("Please enter reqiured info")
      setShowPopupReqiured(true);
            setTimeout(() => {
              setShowPopupReqiured(false);
            }, 1500);
    }
    else{
      try{
        const res = await axios({
          url: 'https://localhost:7161' + '/api/User/Register',
          method: 'POST',
          data: {
              Username: signupUser.username,
              Password: signupUser.password,
              Phone: signupUser.phone
          },
          headers: {
              'Content-Type': 'application/json',
          }
        })
        console.log("Sign Up Successfully")
        setShowPopupSuccessfully(true);
                setTimeout(() => {
                  setShowPopupSuccessfully(false);
                  return navigate('/login');
                }, 2500);
                
      }
      catch(err){
        console.log("This username is already in use")
        setShowPopupAlready(true);
            setTimeout(() => {
              setShowPopupAlready(false);
            }, 1500);
      }
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 32) { // keyCode for spacebar is 32
      event.preventDefault();
    }
  }

  const [inputType, setInputType] = useState('password');
  const [inputClassName, setInputClassName] = useState('fa-regular fa-eye-slash');

  const handlePasswordClick = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
    setInputClassName(inputClassName === 'fa-regular fa-eye' ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye');
  };


  return (
      <div>

<Navbar style={{padding:'0.7%'}} className="navbar-expand-sm fixed-top navbar-toggleable-sm bg-white border-bottom" container-fuild light>
  <NavbarBrand style={{margin:'auto'}} tag={Link} to="/Home">
    <img src="https://sv1.picz.in.th/images/2023/04/08/mlIkAa.png" alt="logo.png" border="0" width="100px"/>
  </NavbarBrand>

</Navbar>

        <div style={{ marginTop: "8%" }} className="image-container">
          <h2 style={{ fontWeight: "bold", transform: "translateY(65px)" }}>Create Account</h2>
        </div>
        <div className="wrapper-signup">
          <form>
            <label>USERNAME</label>
            <input onChange={(e) => {
              setSignupUser({
                ...signupUser,
                username:
                    e.target.value,
              })
            }}
            type="username" maxLength="10" onKeyDown={handleKeyDown} placeholder="" />
            <label>PASSWORD</label>
            <input onChange={(e) => {
              setSignupUser({
                ...signupUser,
                password:
                    e.target.value,
              })
            }} type={inputType} onKeyDown={handleKeyDown} placeholder="" /><span  style={{cursor: 'pointer'}} onClick={handlePasswordClick} className={inputClassName}></span>
            <label>TEL NUMBER</label>
            <input onChange={(e) => {
              setSignupUser({
                ...signupUser,
                phone:
                    e.target.value,
              })
            }}
            type="tel number" maxLength="10" onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }} />
          </form>
          <button onClick={SingUpHandler}
          className="CREATE">Create Account</button>
          <div className="py-2 not-member"><h6>Already have an account?<Link to="/login"> Log in</Link></h6>
          </div>
        </div>


        {showPopupAlready && (

<div id="popup4" className="overlay">
    <div className="popup4 h1 text-center">
    <i class="fa-solid fa-circle-exclamation"></i>
        <div className="h4 py-4"><b>Account already in use</b></div>
    </div>
</div>
)}

{showPopupReqiured && (

<div id="popup4" className="overlay">
    <div className="popup4 h1 text-center">
    <i class="fa-solid fa-question"></i>
        <div className="h4 py-4"><b>Please enter reqiured info</b></div>
    </div>
</div>
)}

{showPopupSuccessfully && (

<div id="popup4" className="overlay">
    <div className="popup4 h1 text-center">
        <i className="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
        <div className="h4 py-4"><b>Sign Up Successfully</b></div>
    </div>
</div>
)}



      </div>
    );
}

export default Signup