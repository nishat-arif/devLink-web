import axios from "axios"
import { base_url } from "../utils/constants"
import { removeRequests } from "../utils/store/requestSlice"
import { useDispatch } from "react-redux"

const RequestCard = ({request}) =>{
    const dispatch = useDispatch();

    const {fromUserId } = request

    const {firstName , lastName , photoUrl , } = fromUserId

    console.log("fromUserId" ,fromUserId )

    const handleReviewRequest = async(status , requestId)=>{

        const reviewedRequest = await axios.post(base_url + '/request/review/' + status + "/" + requestId , {},
                                            { withCredentials: true } )

        console.log("reviewedRequest" , reviewedRequest)
        dispatch(removeRequests(requestId))

    }



    
    return (<div  className="flex  mx-auto">

                    <div className="card card-side bg-base-100 shadow-sm flex h-28 w-[700px]  hover:bg-slate-700">
                        <figure>
                            <img
                            src= {photoUrl}
                            alt="profile photo" />
                        </figure>

                        <div className="px-15 flex gap-10 items-center justify-center">
                            <div >
                                <h2 className="">{firstName + lastName}</h2>
                                <p>sent you a connection request.</p>
                            </div>
                          
                                <div className="">
                                    <button className="btn btn-primary" onClick={()=>handleReviewRequest("accepted" , request._id)}>Accept</button>
                                    </div>
                                    <div className="">
                                    <button className="btn btn-primary" onClick={()=>handleReviewRequest("rejected" , request._id)}>Reject</button>
                                </div>
                           
                            

                        </div>
                            
                    </div>
                   
            </div>)
}

export default RequestCard;