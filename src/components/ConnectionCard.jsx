import { Link } from "react-router-dom";

const ConnectionCard = ({connection}) =>{

    const {firstName , lastName , photoUrl } = connection

    
    return (<div  className="flex  mx-auto">

                <div className="card card-side bg-base-100 shadow-sm flex h-28 w-[700px] hover:bg-slate-700">
                    <figure>
                        <img
                        src= {photoUrl}
                        alt="profile photo" />
                    </figure>

                    <div className="px-15 flex gap-10 items-center justify-center">
                        <div >
                            <h2 className="text-md ">{firstName +" "+ lastName}</h2>
                            <Link className="underline cursor-pointer">View Profile</Link>
                        </div>
                        

                    </div>
                        
                </div>
                   
            </div>)
}

export default ConnectionCard;