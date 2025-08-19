import { useState } from "react";
import axios from 'axios';
import {login_api_url ,base_url , signup_api_suffix} from '../utils/constants'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import {addHeaderFooter} from "../utils/store/bodySlice.js"


const Login = () => {

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [emailId , setEmailId] = useState("");
    const [password , setPassword] = useState("");
    const [errorMessage , setErrorMessage] = useState(null)
    const [isLoginPage , setIsLoginPage] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLoginClick = async () => {

        try{
            const loginCredentials = {emailId , password}

        const options = {withCredentials :true}
        const loginData = await axios.post(login_api_url ,loginCredentials, options)

        // const requestOptions = {
        //                         method: 'POST',
        //                         headers: {'Content-Type': 'application/json'},
        //                         body: JSON.stringify(loginCredentials)};

        // const data = await fetch(login_api_url, requestOptions)
        // const loginData = await data.json();

        dispatch(addUser(loginData?.data?.data));
        dispatch(addHeaderFooter(true))
        navigate("/")
        }
        catch(error){

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                console.error('Axios Error:', error.response ? error.response.data : error.message);
                setErrorMessage("Invalid Login Credential !!")
                } else {
                // Handle other types of errors
                console.error('General Error:', error);
                }

        }

        
     }

     const handleSignUpClick = async () => {

        try{
        const signUpCredentials = {firstName , lastName , emailId , password}

        const options = {withCredentials :true}
        const signUpData = await axios.post(base_url + signup_api_suffix , signUpCredentials , options)

        // const requestOptions = {
        //                         method: 'POST',
        //                         headers: {'Content-Type': 'application/json'},
        //                         body: JSON.stringify(loginCredentials)};

        // const data = await fetch(login_api_url, requestOptions)
        // const loginData = await data.json();

        dispatch(addUser(signUpData?.data?.data));
        dispatch(addHeaderFooter(true))
        navigate("/profile")
        }
        catch(error){

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                console.error('Axios Error:', error.response ? error.response.data : error.message);
                setErrorMessage(error.response.data)
                } else {
                // Handle other types of errors
                console.error('General Error:', error);
                }

        }

        
     }


    return (
    <div className = "flex my-30 items-center justify-center">
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title flex justify-center text-3xl">{isLoginPage ? "Login" : "Sign Up"}</h2>
                <div>
                    {errorMessage && 
                        <div role="alert" className="alert w-[95%] my-4 py-2">
                            <span>Error :  {errorMessage}</span>
                        </div>
                    }
                    {!isLoginPage && 
                    <>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" placeholder="Type here"  value= {firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder="Type here"  value= {lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                        </fieldset>
                    </>}
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Email Id</legend>
                        <input type="text" className="input" placeholder="Type here"  value= {emailId} onChange={(e)=>{setEmailId(e.target.value)}}/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type={isLoginPage ? "password" : "text"} className="input" placeholder="Type here"  value= {password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </fieldset>
                </div>
                <div className="card-actions justify-center my-5 ">
                <button className="btn text-xl" onClick= {isLoginPage ? handleLoginClick : handleSignUpClick}>{isLoginPage ? "Login" : "Sign Up"}</button>
                </div>
                <div >
                <p className="flex justify-center text-md cursor-pointer" onClick={()=>setIsLoginPage(!isLoginPage)}>
                    {isLoginPage ? "New User ? Sign up here" : "Already registered? Login here"}</p>
                </div>
            </div>
            </div>
    </div>)
}

export default Login;
