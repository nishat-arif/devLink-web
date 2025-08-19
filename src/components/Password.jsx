const Password = ()=>{
    return (<div>
                <div className="card bg-neutral text-neutral-content w-96 my-30 mx-auto">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Set New Password</h2>
                        <fieldset className="flex justify-center">
                        <input type="text" className="input " placeholder="Type here"  value= "" />
                    </fieldset>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary">Update</button>
                       
                        </div>
                    </div>
            </div>
        </div>)
}

export default Password;