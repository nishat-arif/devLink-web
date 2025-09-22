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
        const [skills , setSkills] = useState(userData.skills || null);
        const [hobbies , setHobbies] = useState(userData.hobbies || null);
        const [about , setAbout] = useState(userData.about || "");
        const [errorMessage , setErrorMessage] = useState(null)
        const [showToast, setShowToast] = useState(false);
        const [gptBasedBio , setGptBasedBio] = useState([])


        const handleSaveProfileClick = async() =>{

            try{
                const updatedData = await axios.patch( base_url + profile_edit_api_suffix , {
                                            firstName,
                                            lastName,
                                            photoUrl,
                                            age,
                                            gender,
                                            "skills" : skills.includes(',')?skills.split(",").map(skill=>skill.trim()):[skills.trim()],
                                            "hobbies": hobbies.includes(',')?hobbies.split(",").map(hobby=>hobby.trim()):[hobbies.trim()],
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

        const getBioSuggestions = async() => {

            try{

                if(skills==null || hobbies == null){throw new Error("skills and hobbies are required")}

                    
                      const gptData = await axios.post(base_url + "/generate-bio-suggestions" ,
                                                    {"skills" : skills != ''?skills : null,
                                                    "hobbies" : hobbies!= '' ?hobbies : null
                                                    },
                                                   { withCredentials: true }

                )
                setGptBasedBio(gptData.data?.bioSuggestions);
                setErrorMessage(null)
                if(gptData.data?.bioSuggestions){document.getElementById('my_modal_4').showModal();}
                
              
            }catch(error){
                console.log(error)
                
                if (axios.isAxiosError(error)) {
                        // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                        console.error('Axios Error:', error.response ? error.response.data.error : error.message);
                        setErrorMessage(error.response.data.error)
                        } else {
                        // Handle other types of errors
                        console.error('General Error:', error.message);
                        setErrorMessage(error.message)
                        }
            }

        }

        const handleGptBasedBio = async(bio) => {
            setAbout(bio);
            
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

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Skills</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {skills} onChange={(e)=>{setSkills(e.target.value)}}/>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Hobbies</legend>
                                        <input type="text" className="input" placeholder="Type here"  value= {hobbies} onChange={(e)=>{setHobbies(e.target.value)}}/>
                                    </fieldset>


                                    <fieldset className="fieldset">
                                            <legend className="fieldset-legend">About</legend>
                                            <textarea className="textarea" placeholder="Type here" value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                                    </fieldset>
                             

                                    <div className="flex justify-between">
                                        <p className="underline cursor-pointer"> <Link to="/profile/password">Change Password</Link></p>
                                        <p className="underline cursor-pointer" onClick= {()=>{getBioSuggestions();}}>AI suggested Bio</p>
                                    </div>
                                </div>
                                <div className="card-actions justify-center">
                                    <button className="btn text-xl" onClick= {handleSaveProfileClick}>Save Changes</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                <UserCard  className="fixed " user={{firstName, lastName, photoUrl, age, gender, about }} selfProfile={true} />
                </div>

                {skills && hobbies &&

                
                    <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-9/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Bio</h3>
                        {gptBasedBio.map((bio ,index)=> <p key={index} className="py-4 cursor-pointer" onClick={()=>handleGptBasedBio(bio)}>{bio}</p> )}
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn" onClick={()=>setGptBasedBio([])}>Close</button>
                        </form>
                        </div>
                    </div>
                    </dialog>
                }

                

            </>
        

    )
}

export default EditProfile;