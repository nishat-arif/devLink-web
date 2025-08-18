const UserCard = () =>{

    return (<div className="flex justify-center my-[100px]">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                        src= "https://geographyandyou.com/images/user-profile.png"
                        alt="profile photo"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Nishat Arif</h2>
                        <p>This is default about</p>
                        <p>js  , aarays</p>
                        <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>)
}

export default UserCard;