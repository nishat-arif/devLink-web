import axios from "axios";
import { useEffect, useState } from "react";
 import {base_url ,profile_edit_api_suffix} from "../utils/constants"
 import { Link } from "react-router-dom";
 import UserCard from "./UserCard";
 import { useDispatch } from "react-redux";
 import {addUser} from "../utils/store/userSlice"

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

        // const getUserProfile =async ()=>{

        //     try{
        //         const userProfile = await axios.get( base_url + profile_view_api_suffix , {withCredentials : true})
        //         console.log("userProfile" , userProfile) 
        //     }
        //     catch(error){
        //         if (axios.isAxiosError(error)) {
        //                 // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
        //                 console.error('Axios Error:', error.response ? error.response.data : error.message);
        //                 setErrorMessage(error.response.data)
        //                 } else {
        //                 // Handle other types of errors
        //                 console.error('General Error:', error.message);
        //                 setErrorMessage(error.message)
        //                 }

        //     }
        // }

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
                console.log("updatedData" , updatedData)

                dispatch(addUser(updatedData?.data?.data));

                setShowToast(true);

                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
            catch(error){
                if (axios.isAxiosError(error)) {
                        // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                        console.error('Axios Error:', error.response ? error.response.data : error.message);
                        setErrorMessage(error.response.data)
                        } else {
                        // Handle other types of errors
                        console.error('General Error:', error.message);
                        setErrorMessage(error.message)
                        }

            }

            

        }

        useEffect(()=>{
            //getUserProfile();
        },[])


    return (<>
    
    <div className="flex gap-10 justify-center">
            <div className = "flex items-center justify-center my-[100px] h-screen">
                <div className="card bg-primary text-primary-content w-96 h-fit  flex">
                    <div className="card-body flex-srink">
                        <h2 className="card-title flex justify-center text-3xl ">Profile</h2>
                        <div>
                            {/* {errorMessage && 
                                <div role="alert" className="alert w-[95%] my-4 py-2">
                                    <span>Error :  {errorMessage}</span>
                                </div>
                            } */}
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
                                <input type="text" className="input" placeholder="Type here"  value= {about} onChange={(e)=>{setAbout(e.target.value)}}/>
                            </fieldset>

                             <fieldset className="flex justify-center ">
                                <p className="fieldset-legend underline"> <Link to="/">Change Password</Link></p>
                               
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

        {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      </>
        

    )
}

export default EditProfile;