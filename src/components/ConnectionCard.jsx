import { Link } from "react-router-dom";

const ConnectionCard = ({connection}) =>{

    const {firstName , lastName , photoUrl } = connection

    
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
                            <Link className="underline cursor-pointer">View Profile</Link>  
                            <Link className="underline cursor-pointer">Chat</Link> 
                            <Link className="underline cursor-pointer">Remove</Link>
                        </div>
                        

                    </div>
                        
                </div>
                   
            </div>)
}

export default ConnectionCard;