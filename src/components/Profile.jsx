import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useEffect } from "react";
import {base_url ,profile_view_api_suffix} from "../utils/constants"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import axios from "axios";
import Loading from "./Loading";

const Profile = () => {

    const userData = useSelector(store=>store.user.userData)
    const dispatch = useDispatch();

     const getUserProfile = async()=>{
        if(userData) return;

        const profileData = await axios.get(base_url + profile_view_api_suffix , { withCredentials: true })
        dispatch(addUser(profileData.data?.data));

    }

    useEffect(()=>{
                getUserProfile();
            },[])

    if(!userData) return;

    return (<div>
                <EditProfile userData = {userData}/>
            </div>)
        }

export default Profile;