import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {base_url , remove_connection_suffix , feed_api_suffix} from "../utils/constants"
import axios from "axios";
import {removeConnection} from "../utils/store/connectionSlice";
import {addUserToFeed , addFeedContent} from "../utils/store/feedSlice"

const ConnectionCard = ({connection}) =>{

    const {firstName , lastName , photoUrl ,_id } = connection;

     const feedContent = useSelector(store=>store.feed.feedContent)
    const dispatch = useDispatch();

    const handleRemoveConnection = async (id)=>{

        const removedConnectionData = await axios.post(base_url + remove_connection_suffix,
                                                    {_id:id},{withCredentials: true}
        )

        dispatch(removeConnection(id))


        if(!feedContent){
                const usersFeed = await axios.get(base_url+feed_api_suffix ,{withCredentials : true})
                dispatch(addFeedContent(usersFeed?.data?.data))
        }else{
            if(removedConnectionData.data.removedConnection.fromUserId._id == id){
                dispatch(addUserToFeed(removedConnectionData.data.removedConnection.fromUserId));
            }else if(removedConnectionData.data.removedConnection.toUserId._id == id){
                dispatch(addUserToFeed(removedConnectionData.data.removedConnection.toUserId));
            }
        }

        


    }

    
    return (<div  className="flex  mx-auto">

                <div className="card card-side bg-base-100 shadow-sm flex h-28 w-[500px] p-2 hover:bg-slate-900" >
                    <figure className="w-24 h-24 p-1">
                        <img
                        src= {photoUrl}
                        alt="profile photo" className="  object-fit border border-white rounded-full"/>
                    </figure>

                    <div className="px-15 flex flex-col items-start justify-center">
                        
                            <h2 className="text-md ">{firstName +" "+ lastName}</h2>
                        <div className="flex gap-5 mt-4 ">
                            <Link className="underline cursor-pointer"><button className="btn btn-primary">View Profile</button></Link>  
                            <Link  to={"/chat/" + _id} state={connection} className="underline cursor-pointer" ><button className="btn btn-primary">Chat</button></Link> 
                            <Link className="underline cursor-pointer"><button className="btn btn-primary" onClick={()=>handleRemoveConnection(_id)}>Remove</button></Link>
                        </div>
                        

                    </div>
                        
                </div>
                   
            </div>)
}

export default ConnectionCard;