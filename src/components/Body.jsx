import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
//import { useSelector } from "react-redux"; 

const Body =()=>{

    const navigate = useNavigate();

    //const showHeaderFooter = useSelector(store=> store.body.showHeaderFooter)




    useEffect(()=>{
        // Get a cookie
        const value = Cookies.get('authToken');


        if(!value ){
   
            navigate("/login")
        }
        },[])

    return (<   div className="h-screen bg-yellow-50">
                    <NavBar/>
                    <Outlet />
                   <Footer/>
                    
                </div>)
}

export default Body;
