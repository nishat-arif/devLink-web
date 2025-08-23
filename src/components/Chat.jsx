import { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {base_url } from "../utils/constants"

const Chat = ()=>{

 
    const {targetUserId} = useParams(); 
    const location = useLocation();
    location.state;
    const targetUser =  {firstName : location.state.firstName, 
                        lastName :  location.state.lastName,
                         photoUrl :  location.state.photoUrl};


    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [status, setStatus] = useState(false);
    const loggedInUser = useSelector(store=>store.user.userData);
    const loggedInUserId  = loggedInUser?._id

    const time = new Date();

    const fetchChatMessages = async () => {
    const chat = await axios.get(base_url + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);
   
    

    useEffect(()=>{

        if(!loggedInUser) return;

        const socket= createSocketConnection();
        socket.emit("joinChat" , {firstName : loggedInUser?.firstName,  loggedInUserId , targetUserId}) // emit event as soon as comp loads and also sends the object to backend server

        setStatus(true);
        socket.on("messageReceived" ,({firstName , lastName ,photoUrl, text })=>{
            setMessages((messages)=>[...messages , {firstName , lastName  , photoUrl, text }])
        } )
        return ()=>{ socket.disconnect();} // disconnect when comp unlaods

        },[loggedInUserId , targetUserId]);


    const sendMessage =()=>{

        const socket = createSocketConnection();

        socket.emit("sendMessage", {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        photoUrl : loggedInUser.photoUrl,
        loggedInUserId,
        targetUserId,
        text: newMessage,
        });

        setNewMessage("");
    }

    if(!loggedInUser) return;

    return (
    <div className="card card-border bg-base-100 w-[500px]  my-10 mx-auto flex justify-center border border-white ">
        <div className="card-body">
            
            <div className="flex gap-2 items-center">
                <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="user image"
                    src={targetUser.photoUrl}
                />
                </div>
            </div>
            <h2 className="card-title"> {targetUser?.firstName + " " + targetUser?.lastName}</h2>
            {status && <img className="w-3 h-3"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHDPQsuCHNRfXCKlwYos_8QKm71ggxCgFTCJTLzRA_qLElGW6VmIp9jao&s"></img>}

            </div>
            
            <hr/>
            <div className="py-2 h-[400px] overflow-y-scroll flex flex-col">
                {messages && 
                messages.map((msg , index)=>{return (
                    
                
                        <div key={index} className={"chat " + (loggedInUser.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                            <div className="chat-image avatar">
                                <div className="w-8 rounded-full">
                                <img
                                    alt="user image"
                                    src={msg.photoUrl}
                                />
                                </div>
                            </div>
                            <div className="chat-header">
                                {msg.firstName + " " + msg.lastName}
                                <time className="text-xs opacity-50">12:46</time>
                            </div>
                            <div className="chat-bubble bg-primary">{msg.text}</div>
                            <div className="chat-footer opacity-50">{`Seen: ${time.getHours()}:${time.getMinutes()}`}</div>
                        </div>
                
                )})}
            </div>
            
            
            <hr/>
            <div className="card-actions gap-2">
            <input type="text" className="input w-[80%] rounded" value={newMessage}  onChange={(e) => setNewMessage(e.target.value)}/>
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>)
}

export default Chat;