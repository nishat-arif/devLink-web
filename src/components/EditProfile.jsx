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
        // const [skills , setSkills] = useState(userData.skills || null)
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
                // if (axios.isAxiosError(error)) {
                    
                //         // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                //         setErrorMessage(error.response.data)
                //         } else {
                //         // Handle other types of errors
                //         setErrorMessage(error.message)
                //         }

            }

            

        }


    return (<>

        {errorMessage && <Error message={errorMessage}/>}

        {showToast && 
                        <div className="toast toast-top toast-center my-20 absolute">
                            <div className="alert alert-success">
                                <span className="text-black">Profile saved successfully.</span>
                            </div>
                        </div>
        }

        
    
        <div className="flex gap-10 justify-center">
            <div className = "flex items-center justify-center my-[100px] h-screen">
                <div className="card bg-primary text-primary-content w-96 h-fit  flex">
                    <div className="card-body flex-srink">
                        <h2 className="card-title flex justify-center text-3xl ">Profile</h2>

                        <div>
                            
                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                            </fieldset>

                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Email Id</legend>
                                <input type="text" className="input cursor-not-allowed" placeholder="Type here"  value= {userData.emailId} disabled />
                            </fieldset>


                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {age} onChange={(e)=>{setAge(e.target.value)}}/>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {gender} onChange={(e)=>{setGender(e.target.value)}}/>
                            </fieldset>

                            <fieldset className="fieldset my-2">
                                <legend className="fieldset-legend">Photo Url</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {photoUrl} onChange={(e)=>{setPhotoUrl(e.target.value)}}/>
                            </fieldset>

                            {/* <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills</legend>
                                <input type="text" className="input" placeholder="Type here"  value= {skills} onChange={(e)=>{setSkills(e.target.value)}}/>
                            </fieldset> */}


                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                {/* <input type="text" className="input" placeholder="Type here"  value= {about} onChange={(e)=>{setAbout(e.target.value)}}/> */}
                                <textarea className="textarea" placeholder="Type here" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                            </fieldset>

                             <fieldset className="flex justify-center ">
                                <p className="fieldset-legend underline"> <Link to="/profile/password">Change Password</Link></p>
                               
                                {/* <input type="text" className="input" placeholder="Type here"  value= {password} onChange={(e)=>{setPassword(e.target.value)}}/> */}
                            </fieldset>
                        </div>
                        <div className="card-actions justify-center my-5 ">
                        <button className="btn text-xl" onClick= {handleSaveProfileClick}>Save Changes</button>
                        </div>
                         
                    </div>
                </div>
            </div>
            <UserCard user={{firstName, lastName, photoUrl, age, gender, about }} selfProfile={true} />
        </div>

       

      </>
        

    )
}

export default EditProfile;