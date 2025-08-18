import { useSelector } from "react-redux";
import axios from 'axios';
import {logout_api_url} from '../utils/constants'
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {addHeaderFooter} from "../utils/store/bodySlice.js"

const NavBar = () =>{

  const userData = useSelector(store => store.user.userData);

   const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogoutClick = async()=>{

        const options = {withCredentials :true}
        await axios.post(logout_api_url ,{}, options)
        dispatch(removeUser())
        dispatch(addHeaderFooter(false))
        navigate("/login")

  }

    return (<div>

                      
      <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
            <Link to="/">DevLink</Link>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Search" className="input input-bordered mx-5 w-24 md:w-auto" />
            
              {userData && <div className="flex items-center mx-2"><p >Welcome, {userData.firstName}</p>
              <div className="dropdown dropdown-end mx-5">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile photo"
                      src= {userData.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li><Link  className="justify-between" to="/profile">Profile</Link></li>
                  <li><Link  className="justify-between" to="/connections">Connections</Link></li>
                  <li><Link  className="justify-between" to="/requests">Requests</Link></li>
                  <li><a onClick={handleLogoutClick}>Logout</a></li>
                </ul>
              </div>
              </div>}
            
            
            
          </div>
      </div>

            </div>)
}

export default NavBar;