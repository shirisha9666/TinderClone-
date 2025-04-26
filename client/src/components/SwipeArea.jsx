import React from 'react'
import { useMatchStore } from '../store/useMatchStore'
import TinderCard from "react-tinder-card"

const SwipeArea = () => {
    const {userProfiles,swipeLeft,swipeRight}=useMatchStore();
    const handelSwipe=(dir,user)=>{
if(dir==="right")swipeRight(user)
    else if(dir==="left")swipeLeft(user)
    }
  return (
    <div className='relative w-full max-w-sm h-[28rem]'>
        {userProfiles.map(user=>(
         <TinderCard
         className='absolute shadow-none'
            key={user._id}
            onSwipe={(dir)=>handelSwipe(dir,user)}
            swipeRequirementType='position'
            
            swipeThreshold={200}
            preventSwipe={["up","down"]}>
                <div className='card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200'>
                    <figure className='px-4 pt-4 h-3/4'>
                        <img src={user.image || "/avatar.png"} alt='user.name'/>
                    </figure>
                    <div className='card-body bg-gradient-to=b from-white to-pink-50 '>
                        <h2 className='card-title text-2xl text-gray-800'>{user.name},{user.age}</h2>
                        <p className='text-gray-600'>{user.bio}</p>
                    </div>
                </div>
            </TinderCard>
        ))}
    </div>
  )
}

export default SwipeArea