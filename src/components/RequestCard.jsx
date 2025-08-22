import axios from "axios"
import { base_url } from "../utils/constants"
import { removeRequests } from "../utils/store/requestSlice";
import { addConnections } from "../utils/store/connectionSlice";
import { useDispatch , useSelector} from "react-redux"

const RequestCard = ({request}) =>{

    const dispatch = useDispatch();
    const allConnections = useSelector(store=> store.connection.allConnections)
    const {fromUserId } = request
    const {firstName , lastName , photoUrl , } = fromUserId

    const handleReviewRequest = async(status , requestId)=>{

        const reviewedData = await axios.post(base_url + '/request/review/' + status + "/" + requestId , {}, { withCredentials: true } )
        dispatch(removeRequests(requestId))
        if(status === "accepted"){
            
            if(!allConnections){
                dispatch(addConnections([...[reviewedData.data.data.fromUserId]]))

            }else{
                dispatch(addConnections([...allConnections , ...[reviewedData.data.data.fromUserId]]))

            }
            
        }
        
    }



    
    return (<div  className="flex  mx-auto">

                    <div className="card card-side bg-base-100 shadow-sm flex h-28 w-[700px] p-2 hover:bg-slate-900">
                        <figure className="w-24 h-24 p-1">
                            <img
                            src= {photoUrl}
                            alt="profile photo" className=" object-fit border border-white rounded-full "/>
                        </figure>

                        <div className="px-15 flex gap-10 items-center justify-center">
                            <div >
                                <h2 className="">{firstName +" " + lastName}</h2>
                                <p>sent you a connection request.</p>
                            </div>
                          
                                <div className="">
                                    <button className="btn btn-primary hover:bg-indigo-400" onClick={()=>handleReviewRequest("accepted" , request._id)}>Accept</button>
                                    </div>
                                    <div className="">
                                    <button className="btn btn-primary hover:bg-indigo-400" onClick={()=>handleReviewRequest("rejected" , request._id)}>Reject</button>
                                </div>
                        </div>        
                    </div> 
            </div>)
}

export default RequestCard;