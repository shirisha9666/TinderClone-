import User from "../model/Users.js"
import { getConnectedUsers, getIo } from "../socket/socket.server.js";

export const swipeRight=async(req,res)=>{
try {
    const {likedUserId}=req.params;
    const currentUser=await User.findById(req.user.id);
    const likeduser=await User.findById(likedUserId)
    if(!likeduser){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }
    if(!currentUser.likes.includes(likedUserId)){
        currentUser.likes.push(likedUserId)
        await currentUser.save()
        // if the other user alredy liked us, it's a mathc so let's update both users
    if(likeduser.likes.includes(currentUser.id)){
        currentUser.matches.push(likedUserId)
        likeduser.matches.push(currentUser.id)
        await Promise.all([
            await currentUser.save(),
            await likeduser.save()
        ])
        // TODO send notification if it is a match => socket.io
        const connectedUsers=getConnectedUsers()
        const io=getIo();
        const likeduserSocketId=connectedUsers.get(likedUserId);
        if(likeduserSocketId){
            io.to(likeduserSocketId).emit("newMatch",{
                _id:currentUser._id,
                name:currentUser.name,
                image:currentUser.image
            })
        }
        const currentSocketId=connectedUsers.get(currentUser._id.toString())
    if(currentSocketId){
        io.to(currentSocketId).emit("newMatch",{
            _id:likeduser._id,
            name:likeduser.name,
            image:likeduser.image
        })
    }
    }
    res.status(200).json({
        success:true,
        user:currentUser
    })
   
    }
} catch (error) {
    console.log("erro in swipe Right :",error)
    res.status(500).json({
        success:false,
         message:"Internal server Error"
    })
}
}

export const swipeLeft=async(req,res)=>{
try {
  const{dilikedUserId}  =req.params
  const currentUser=await User.findById(req.user.id);
  if(!currentUser.dislikes.includes(dilikedUserId)){
    currentUser.dislikes.push(dilikedUserId);
    await currentUser.save();
  }
  res.status(200).json({
    success:true,
    user:currentUser
  })
} catch (error) {
    console.log("Error in swipeLeft:",error)
    res.status(500).json({
        success:false,
        message:"Internal server Error"
    })
}
}
export const getMatches=async(req,res)=>{
try {
   const user=await User.findById(req.user.id).populate("matches","name image");
   res.status(200).json({
    success:true,
    matches:user.matches
   })
} catch (error) {
    console.log("Error in getMatches :",error)
    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}
export const getuserProfiles=async(req,res)=>{
    try {
       const currentUser=await User.findById(req.user.id);
       const users=await User.find({
        $and:[
            {_id:{$ne:currentUser.id}},
            {_id:{$nin:currentUser.likes}},
            {_id:{$nin:currentUser.dislikes}},
            {_id:{$nin:currentUser.matches}},
            {
                gender:currentUser.genderPreference==="both"?{$in:["male","female"]}:currentUser.genderPreference
            },
            {genderPreference:{$in:[currentUser.gender,"both"]}},
        ]
       })
       res.status(200).json({
        success:true,
        users
       }) ;

    } catch (error) {
        console.log("Error in getUserProfiles:",error)
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}