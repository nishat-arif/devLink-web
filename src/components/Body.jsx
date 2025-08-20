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

const Body =()=>{

    const dispatch = useDispatch();
    const userData = useSelector(store=> store.user.userData)
    const navigate = useNavigate();

    const getUserProfile = async()=>{

            if (userData) return;
            try {
            const profileData = await axios.get(base_url + profile_view_api_suffix , {
                withCredentials: true,
            });
            dispatch(addUser(profileData.data?.data));
            } catch (err) {
            if (err.status === 401 || err.status === 404) {
                navigate("/login");
            }
            console.error(err);
            }
        };
    

    

    useEffect(()=>{

            getUserProfile();

        
        },[])

    return (
            <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <NavBar/>
            </div>

            <div className="flex h-screen fixed inset-0  ">
                <main className="flex-1 overflow-y-auto mt-16 mb-16 bg-indigo-300">
                    <Outlet/>
                </main>
            </div>

          

            <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
                <Footer/>
            </div>
            </div>
                )
}

export default Body;
