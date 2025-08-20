import axios from "axios";
import { base_url } from "../utils/constants";
import {removeUserFromFeed} from '../utils/store/feedSlice';
import { useDispatch  } from "react-redux";

const UserCard = ({user , selfProfile}) =>{


    const dispatch = useDispatch();
    const { _id, about  , firstName , lastName , skills , age , gender , photoUrl} = user;

    const handleSendRequest =async(status , userId)=>{
        try{
            await axios.post(base_url + "/request/send/" + status + "/" + userId ,
                                            {},
                                            { withCredentials: true }
                                        );

            dispatch(removeUserFromFeed(userId));
        }catch(error){
            if (axios.isAxiosError(error)) {
                        // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                        console.error('Axios Error:', error.response ? error.response.data : error.message);

                        } else {
                        // Handle other types of errors
                        console.error('General Error:', error.message);
               
                        }

        }

       
        

    }

    return (<div className="flex justify-center my-[100px]">
                <div className="card bg-base-100 w-96 shadow-sm pt-[30px] hover:bg-slate-900">
                    <figure className="px-10 pt-10 w-96 h-96">
                        <img
                        src= {photoUrl}
                        alt="profile photo"
                        className="rounded-xl object-fit" />
                    </figure>
                    <div className="card-body items-center text-center justify-around">
                        <h2 className="card-title">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age} , {gender}</p>}
                        {skills && <p>{skills}</p>}
                        <p>{about }</p>
                        {!selfProfile &&
                        
                        <div className="card-actions">
                        <button className="btn btn-primary hover:bg-indigo-400 cursor-pointer" onClick={()=>handleSendRequest("interested" , _id)}>Like</button>
                        <button className="btn btn-primary hover:bg-indigo-400 cursor-pointer" onClick={()=>handleSendRequest("ignored" , _id)}>Pass</button>
                        </div>
                        
                        }
                        
                    </div>
                </div>
            </div>)
}

export default UserCard;