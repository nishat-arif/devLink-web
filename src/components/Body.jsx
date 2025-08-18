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

    return (
                      <div class="flex flex-col min-h-screen">
                        <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                            <NavBar/>
                        </div>

                        <main class="flex-1 overflow-y-auto mt-16 mb-16 bg-amber-50">
                            <Outlet/>
                        </main>

                        <div class="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
                            <Footer/>
                        </div>
                        </div>
                )
}

export default Body;
