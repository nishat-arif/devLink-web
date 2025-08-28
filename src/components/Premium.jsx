import axios from "axios";
import { useEffect, useState } from "react";
 import {base_url , payment_create_suffix, payment_verify_suffix } from "../utils/constants.js"
import { useDispatch } from "react-redux";
import { updateUserIsPremium } from "../utils/store/userSlice";

const Premium = ()=>{

    const [isUserPremium, setIsUserPremium] = useState(false);
    const dispatch = useDispatch();
    

    useEffect(() => {
        //if(!isUserPremium ) return;
        verifyPremiumUser();
    }, [isUserPremium]);

    

    const verifyPremiumUser = async () => {
        const res = await axios.get(base_url + payment_verify_suffix, {
        withCredentials: true,
        });

        if (res.data.isPremium) {
        setIsUserPremium(true);
        dispatch(updateUserIsPremium(true))
        }
    };

    

     const handleSubscription = async (type) => {
            const order = await axios.post(base_url + payment_create_suffix, {membershipType: type,},{ withCredentials: true });
            console.log("order" , order)

            const { amount, keyId, currency, notes, orderId } = order.data.data;

            const options = {
            key: keyId,
            amount,
            currency,
            name: "DevLink",
            description: "Connect to other developers",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: "9999999999",
            },
            theme: {
                color: "#F37254",
            },
            handler: verifyPremiumUser, //this handler is called after dialog box is closed on successful payment
            };


            // when you click on subscribe button --->(you make and api call to bckend and once you get order and orderId )this will open up the dialog box which shows payment options to make payment
            const rzp = new window.Razorpay(options);
            rzp.open();
  };
    return isUserPremium ?
         <div className="flex justify-center my-40">
            <div className="card w-96 bg-base-100 shadow-sm flex items-center justify-center">
                <div className="card-body">
                    <h3 className="badge badge-lg badge-warning mx-auto">Congratulations!!!</h3>
                    <div className="flex justify-between">
                    <p className="text-lg font-bold">You are now a premium member and eligible for :</p>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Swipe right as much as you want without daily limits.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Get a badge to display exclusive status on your profile</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Undo your last swipe if you made a mistake.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Change your location to swipe and match with people.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Enjoy an ad-free experience.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span >Visible to only users you have liked.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span >AI powered experience</span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        
        :

        <div className="flex justify-center my-40">
            <div className="card w-96 bg-base-100 shadow-sm flex items-center justify-center">
                <div className="card-body">
                    <span className="badge badge-xs badge-warning">Most Popular</span>
                    <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">Premium</h2>
                    <span className="text-xl">Rs.500/yr</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Swipe right as much as you want without daily limits.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Get a badge to display exclusive status on your profile</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Undo your last swipe if you made a mistake.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Change your location to swipe and match with people.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span>Enjoy an ad-free experience.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span >Visible to only users you have liked.</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        <span >AI powered experience</span>
                    </li>
                    </ul>
                    <div className="mt-6">
                    <button className="btn btn-primary btn-block" onClick={()=>{handleSubscription("premium")}}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        

}

export default Premium;