import axios from "axios";
import { useState } from "react";
 import {base_url ,profile_edit_api_suffix} from "../utils/constants"
 import { Link } from "react-router-dom";
 import UserCard from "./UserCard";
 import { useDispatch } from "react-redux";
 import {addUser} from "../utils/store/userSlice";
 import Error from './Error'

const EditProfile = ({userData}) => {

        const dispatch = useDispatch();

        const [firstName , setFirstName] = useState(userData.firstName);
        const [lastName , setLastName] = useState(userData.lastName);
        const [age , setAge] = useState(userData.age || '');
        const [gender , setGender] = useState(userData.gender || "");
        const [photoUrl , setPhotoUrl] = useState(userData.photoUrl || "");
        const [about , setAbout] = useState(userData.about || "");
        const [errorMessage , setErrorMessage] = useState(null)
        const [showToast, setShowToast] = useState(false);


        const handleSaveProfileClick = async() =>{

            try{
                const updatedData = await axios.patch( base_url + profile_edit_api_suffix , {
                                            firstName,
                                            lastName,
                                            photoUrl,
                                            age,
                                            gender,
                                            about,
                                            },
                                            { withCredentials: true }
                                        );

                dispatch(addUser(updatedData?.data?.data));
                setErrorMessage(null)
                setShowToast(true);

                
                setTimeout(() => {
                    return setShowToast(false);
                }, 2000);
            }
            catch(error){
                setErrorMessage(error.response.data)

            }
        }


    return (<>


                {showToast &&  <div className="toast toast-top toast-center my-20 z-10">
                                    <div className="alert alert-success">
                                        <span className="text-black">Profile saved successfully.</span>
                                    </div>
                                </div>
                }

                <div className=" flex gap-10 justify-center h-screen fixed inset-0">

                    <div className = "flex items-start justify-center my-[100px]  overflow-y-auto">
                        {errorMessage && 
                                        <div role="alert" className="alert alert-error my-2 z-10 absolute flex w-auto mx-auto text-white bg-red-700">
                                        <span>{errorMessage}</span>
                                        </div>
                        }

                        <div className="card bg-primary text-primary-content w-96">
                            <div className="card-body py-5">
                                <h2 className="card-title flex justify-center text-xl">Profile</h2>

                                <div>  
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">First Name</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Last Name</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Email Id</legend>
                                        <input type="text" className="input cursor-not-allowed" placeholder="Type here"  value= {userData.emailId} disabled />
                                    </fieldset>


                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Age</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {age} onChange={(e)=>{setAge(e.target.value)}}/>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Gender</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {gender} onChange={(e)=>{setGender(e.target.value)}}/>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Photo Url</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {photoUrl} onChange={(e)=>{setPhotoUrl(e.target.value)}}/>
                                    </fieldset>

                                    {/* <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Skills</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {skills} onChange={(e)=>{setSkills(e.target.value)}}/>
                                    </fieldset> */}


                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">About</legend>
                                        <textarea className="textarea" placeholder="Type here" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                                    </fieldset>

                                    <fieldset className="flex justify-center ">
                                        <p className="fieldset-legend underline"> <Link to="/profile/password">Change Password</Link></p>
                                    </fieldset>
                                </div>
                                <div className="card-actions justify-center">
                                   
                                <button className="btn text-xl" onClick= {handleSaveProfileClick}>Save Changes</button>
                                
                                </div>
                                
                            </div>
                        </div>
                    </div>

                <UserCard  className="fixed " user={{firstName, lastName, photoUrl, age, gender, about }} selfProfile={true} />

                    

                </div>

            </>
        

    )
}

export default EditProfile;