import { useState } from "react";
import axios from 'axios';
import {login_api_url} from '../utils/constants'
import { useDispatch } from "react-redux";
import { addLoginCrdentials } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [emailId , setEmailId] = useState("");
    const [password , setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLoginClick = async () => {

        const loginCredentials = {emailId , password}

        const options = {withCredentials :true}
        const loginData = await axios.post(login_api_url ,loginCredentials, options)

        // const requestOptions = {
        //                         method: 'POST',
        //                         headers: {'Content-Type': 'application/json'},
        //                         body: JSON.stringify(loginCredentials)};

        // const data = await fetch(login_api_url, requestOptions)
        // const loginData = await data.json();

        dispatch(addLoginCrdentials(loginData?.data?.data));
        navigate("/")
     }


    return (
    <div className = "flex my-30 items-center justify-center">
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title flex justify-center text-3xl">Login</h2>
                <div>
                    <fieldset className="fieldset my-2">
                        <legend className="fieldset-legend">Email Id</legend>
                        <input type="text" className="input" placeholder="Type here"  value= {emailId} onChange={(e)=>{setEmailId(e.target.value)}}/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="text" className="input" placeholder="Type here"  value= {password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </fieldset>
                </div>
                <div className="card-actions justify-center my-5 ">
                <button className="btn text-xl" onClick= {handleLoginClick}>Login</button>
                </div>
            </div>
            </div>
    </div>)
}

export default Login;
