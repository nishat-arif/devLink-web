const Chat = ()=>{
    return (
    <div className="card card-border bg-base-100 w-[500px]  my-10 mx-auto flex justify-center border border-white ">
        <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <hr/>
            <div className="py-2 h-[400px]">
               
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                            />
                            </div>
                        </div>
                        <div className="chat-header">
                            Anakin
                            <time className="text-xs opacity-50">12:46</time>
                        </div>
                        <div className="chat-bubble bg-primary">I hate you!</div>
                        <div className="chat-footer opacity-50">Seen at 12:46</div>
                    </div>
            </div>
            
            <hr/>
            <div className="card-actions gap-2">
            <input type="text" className="input w-[80%] rounded" />
            <button className="btn btn-primary">Send</button>
            </div>
        </div>
    </div>)
}

export default Chat;