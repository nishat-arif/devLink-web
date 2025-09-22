import { useDispatch, useSelector } from "react-redux";
import { connection_api_suffix } from "../utils/constants.js";
import { base_url } from "../utils/constants.js";
import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { addConnections } from "../utils/store/connectionSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import { useState } from "react";

const Connections = () =>{

    const [userData , setUserData] = useState("")

    const dispatch = useDispatch();
    const allConnections = useSelector(store=> store.connection.allConnections)

    const getAllConnections =async()=>{ 
        if(allConnections) return;
        const connections = await axios.get(base_url + connection_api_suffix ,  { withCredentials: true })
        dispatch(addConnections(connections?.data?.data))
    }

    const getProfile =(connection)=>{

        console.log("connection" , connection);

        setUserData(connection);

        document.getElementById('my_modal_1').showModal()

    }

    useEffect(()=>{
        getAllConnections()
    },[])

    if(!allConnections) return;

    if (allConnections.length <= 0){
        return (<div className=' bg-indigo-600 text-white p-5 flex  flex-col gap-2 w-1/3 mx-auto my-10 py-4 items-center justify-center rounded-xl'>
                    <h3>You have no connections currently .</h3><Link to="/" className="cursor-pointer underline">Let's explore the feed for new connections!!</Link>
                </div>);}

    return (<>
            <div className="flex my-15  flex-col gap-10">
                { allConnections.map((connection)=> <ConnectionCard key ={connection._id} connection={connection} handleViewProfile={()=>getProfile(connection)}/>)}
            </div>
            
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box h-[80vh] flex">
               
                    <UserCard user={userData} selfProfile={true} className="shrink" />
    
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn justify-center">Close</button>
                </form>
                </div>
            </dialog>
            </>)
}

export default Connections;