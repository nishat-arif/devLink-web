import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
 import {base_url ,profile_view_api_suffix} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";
//import { useSelector } from "react-redux"; 

const Body =()=>{

    const dispatch = useDispatch();
    const userData = useSelector(store=> store.user.userData)
    const navigate = useNavigate();

    //const showHeaderFooter = useSelector(store=> store.body.showHeaderFooter)
    const getUserProfile = async()=>{
        if(userData) return;

        const profileData = await axios.get(base_url + profile_view_api_suffix , { withCredentials: true })
        dispatch(addUser(profileData.data?.data));

    }




    useEffect(()=>{
        // Get a cookie
        const value = Cookies.get('authToken');
        if(!value ){
            navigate("/login")
        }else{
            getUserProfile();

        }
        },[])

    return (
                      <div className="flex flex-col min-h-screen">
                        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                            <NavBar/>
                        </div>

                        <main className="flex-1 overflow-y-auto mt-16 mb-16 bg-amber-50">
                            <Outlet/>
                        </main>

                        <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
                            <Footer/>
                        </div>
                        </div>
                )
}

export default Body;
