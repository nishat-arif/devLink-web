import { useEffect , useState} from "react";
import axios from "axios";
 import {feed_api_suffix , base_url} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import {addFeedContent} from '../utils/store/feedSlice';
import UserCard from "./UserCard";
import Error from "./Error";
import Loading from "./Loading"

const Feed = () => {

    const [errorMessage , setErrorMessage] = useState(null)

    const dispatch = useDispatch()
    const feedContent = useSelector(store=>store.feed.feedContent)

    const getUsersFeed = async()=>{
        
            if (feedContent) return; //This line acts as a memoization or optimization. If the feed data already exists in the Redux store, the function immediately returns, preventing unnecessary API calls.
            
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
                        console.error('General Error:', error.message);
                        setErrorMessage(error.message)
                        }
            
            }
        
        } 

    useEffect(()=>{
            getUsersFeed();
            },[])//The empty dependency array [] ensures that the getUsersFeed() function is called only once when the Feed component mounts.

    if (!feedContent) return <Loading />; //This line performs a conditional rendering check. If feed data is not yet available (e.g., while the API call is in progress), the component will render nothing (or a loading indicator could be rendered here). Once feed data is present, the component will proceed to render its content (which is not shown in this snippet but would typically involve mapping over the feed data to display individual feed items).

    if (feedContent.length <= 0){
        return (<div className='bg-indigo-600 text-white flex w-1/3 mx-auto my-10 py-4 justify-center rounded-xl'>
                <h3>No new user profile exists currently!!</h3>
                </div>);}




    return (<>
            {errorMessage && <Error message={errorMessage}/>}
            {feedContent && <div className="flex justify-center fixed inset-0"> 
                                <UserCard user={feedContent[0]} selfProfile={false}/> 
                            </div>}
             </>
            )

}

export default Feed;
