const UserCard = ({user}) =>{
    console.log(user)

    const { about  , firstName , lastName , skills , age , gender , photoUrl} = user

    return (<div className="flex justify-center my-[100px]">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                        src= {photoUrl}
                        alt="profile photo"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age} , {gender}</p>}
                        {skills && <p>{skills}</p>}
                        <p>{about }</p>
                        
                        <div className="card-actions">
                        <button className="btn btn-primary">Like</button>
                        <button className="btn btn-primary">Pass</button>
                        </div>
                    </div>
                </div>
            </div>)
}

export default UserCard;