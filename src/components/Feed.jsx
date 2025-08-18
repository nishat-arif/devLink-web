import { useEffect , useState} from "react";
import axios from "axios";
 import {feed_api_suffix , base_url} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import {addFeedContent} from '../utils/store/feedSlice';
import UserCard from "./UserCard";

const Feed = () => {

    const [errorMessage , setErrorMessage] = useState("")
    console.log(errorMessage)

    
    const dispatch = useDispatch()
    const feedContent = useSelector(store=>store.feed.feedContent)
    console.log("feedContent",feedContent)

    const getUsersFeed = async()=>{
        
            if (feedContent) return; //This line acts as a memoization or optimization. If the feed data already exists in the Redux store, the function immediately returns, preventing unnecessary API calls.
            console.log("122334")
            try {

                const usersFeed = await axios.get(base_url+feed_api_suffix ,{withCredentials : true})
                dispatch(addFeedContent(usersFeed?.data?.data))

            } catch (error) {

                if (axios.isAxiosError(error)) {
                        // Handle Axios-specific errors (e.g., network errors, server responses with status codes)
                        console.error('Axios Error:', error.response ? error.response.data : error.message);
                        setErrorMessage(error.response.data)
                        } else {
                        // Handle other types of errors
                        console.error('General Error:', error);
                        setErrorMessage(error)
                        }
            
            }
        
        } 

    useEffect(()=>{
        console.log("njfnjvnjfvjnfjv")
            getUsersFeed();
    },[])//The empty dependency array [] ensures that the getUsersFeed() function is called only once when the Feed component mounts.

    if (!feedContent) return; //This line performs a conditional rendering check. If feed data is not yet available (e.g., while the API call is in progress), the component will render nothing (or a loading indicator could be rendered here). Once feed data is present, the component will proceed to render its content (which is not shown in this snippet but would typically involve mapping over the feed data to display individual feed items).

  if (feedContent.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;




    return (feedContent && <div>
                <UserCard user={feedContent[0]}/>
            </div>
            )

}

export default Feed;
