import { useState } from "react";
import {password_set_suffix , base_url} from "../utils/constants";
import axios from "axios";

const Password = ()=>{

    const [newPassword , setNewPassword] = useState("");
      const [showToast, setShowToast] = useState(false);

    const handlePasswordChange = async()=>{

        await axios.patch(base_url+password_set_suffix , 
                                        {"password" :newPassword},
                                        {withCredentials:true}
                                    )
        setShowToast(true);

        setNewPassword("")

        setTimeout(() => {
                    return setShowToast(false);
                }, 2000);
    
    }
    return (<div>

                 {showToast &&  <div className="toast toast-top toast-center my-20 z-10">
                                    <div className="alert alert-success">
                                        <span className="text-black">Password Updated successfully.</span>
                                    </div>
                                </div>
                }


                <div className="card bg-neutral text-neutral-content w-96 my-30 mx-auto">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Set New Password</h2>
                        <fieldset className="flex justify-center">
                        <input type="text" className="input " placeholder="Type here"  value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} />
                    </fieldset>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handlePasswordChange}>Update</button>
                       
                        </div>
                    </div>
                </div>
        </div>)
}

export default Password;