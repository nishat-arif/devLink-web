import { useEffect } from "react";
import RequestCard from "./RequestCard";
import {requestsReceived_api_suffix , base_url} from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/store/requestSlice";

const Requests = () =>{
    const dispatch = useDispatch();

    const allRequests = useSelector(store=>store.request.allRequests)


    const getAllRequests = async()=>{
        if(allRequests) return



        const requestData = await axios.get(base_url+requestsReceived_api_suffix , { withCredentials: true });
        console.log("getRequest" , requestData?.data?.data)

        dispatch(addRequests(requestData?.data?.data))
    }


    useEffect(()=>{
        getAllRequests();
    },[])
     
    if(!allRequests) return;

    if (allRequests.length <= 0){
        return (<div className=' bg-amber-500 text-black flex w-1/3 mx-auto my-10 py-4 justify-center rounded-xl'>
                <h3>No Pending Requests!!!</h3>
                </div>);}

    return (<div className="flex my-15 flex-col gap-10">

                {allRequests.map((request)=><RequestCard key={request._id} request={request} />)}

            </div>)
}

export default Requests;