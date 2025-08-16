import { useSelector } from "react-redux";
import axios from 'axios';
import {logout_api_url} from '../utils/constants'
import { useDispatch } from "react-redux";
import { removeLoginCredentials } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () =>{

  const loggedInData = useSelector(store => store.user.loggedInData);

   const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogoutClick = async()=>{

        const options = {withCredentials :true}
        const logoutData = await axios.post(logout_api_url , options)
        console.log("logoutData" ,logoutData )

        dispatch(removeLoginCredentials())

        navigate("/login")

  }

    return (<div>

                      
      <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-4xl">DevLink</a>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Search" className="input input-bordered mx-5 w-24 md:w-auto" />
            
              {loggedInData && <div className="flex items-center mx-2"><p >Welcome, {loggedInData.firstName}</p>
              <div className="dropdown dropdown-end mx-5">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile photo"
                      src= {loggedInData.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogoutClick}>Logout</a></li>
                </ul>
              </div>
              </div>}
            
            
            
          </div>
      </div>

            </div>)
}

export default NavBar;