import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import axios from 'axios';


function Login() {

    const [showPopupCorrect, setShowPopupCorrect] = useState(false);
    const [showPopupIncorrect, setShowPopupIncorrect] = useState(false);
    
    useEffect(() => {
        localStorage.clear();
        document.body.classList.add('LOGIN');

        return () => {
            document.body.classList.remove('LOGIN');
        }

    }, []);



    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })
    async function Login() {
        try {
            const res = await axios({
                url: 'https://localhost:7161' + '/api/User/Login',
                method: 'POST',
                data: {
                    Username: userLogin.username,
                    Password: userLogin.password,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })


            localStorage.setItem('token', res.data)
            setShowPopupCorrect(true);
            setTimeout(() => {
                setShowPopupCorrect(false);
                return navigate('/Home');
            }, 1500);
            
        }
        catch (error) {
            console.log("Username or Password Incorrect")
            setShowPopupIncorrect(true);
            setTimeout(() => {
                setShowPopupIncorrect(false);
            }, 1500);
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


            <Navbar style={{ padding: '0.7%' }} className="navbar-expand-sm fixed-top navbar-toggleable-sm bg-white border-bottom" container-fuild light>
                <NavbarBrand style={{ margin: 'auto' }} tag={Link} to="/Home">
                    <img src="https://sv1.picz.in.th/images/2023/04/08/mlIkAa.png" alt="logo.png" border="0" width="100px" />
                </NavbarBrand>

            </Navbar>

            <div style={{ marginTop: "5%" }} className="image-container">
                <img src="https://sv1.picz.in.th/images/2023/04/17/mejP8k.png" alt="My Image" className="login_img"></img>
            </div>
            <div className="wrapper">


                <form>
                    <label >USERNAME</label>
                    <input onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            username:
                                e.target.value,
                        })
                    }}
                        type="username" maxLength="10" onKeyDown={handleKeyDown} placeholder="" />
                    <label>PASSWORD</label>
                    <input onChange={(e) => {
                        setUserLogin({
                            ...userLogin,
                            password:
                                e.target.value,
                        })
                    }}
                        type={inputType} onKeyDown={handleKeyDown} placeholder="" /><span  style={{cursor: 'pointer'}} onClick={handlePasswordClick} className={inputClassName}></span>
                </form>
                <button className="m-auto START" onClick={Login}>Let's Start</button>
                <div className="py-2 not-member"><h6>
                    Don't have an account? <Link to="/signup">Create Account</Link></h6>
                </div>
            </div>

            {showPopupCorrect && (

                <div id="popup4" className="overlay">
                    <div className="popup4 h1 text-center">
                        <i className="fa-solid fa-circle-check" style={{ color: 'green' }}></i>
                        <div className="h4 py-4"><b>Welcome to MEALMATE!</b></div>
                    </div>
                </div>
            )}

            {showPopupIncorrect && (

                <div id="popup4" className="overlay">
                    <div className="popup4 h1 text-center">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                        <div className="h4 py-4"><b>Username or Password Incorrect</b></div>
                    </div>
                </div>
            )}




        </div>


    );
}

export default Login;