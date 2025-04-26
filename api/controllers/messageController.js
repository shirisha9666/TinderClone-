import Message from "../model/message.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";

export const sendMessage=async(req,res)=>{
    try {
        const{content,receiverId}=req.body;
        const newMessage=await Message.create({
            sender:req.user.id,
            receiver:receiverId,
            content
        })
        // To send the message in real time => socket.io
        const io=getIo();
        const connectedUsers=getConnectedUsers();
        const receiverSocketId=connectedUsers.get(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",{
                message:newMessage
            })
        }
        res.status(201).json({
            success:true,
            message:newMessage
        })
    } catch (error) {
        console.log("error  in the sendMessage :",error)
   return res.status(400).json({
    success:false,
    message:"Internal server Error"
   })
    }
}
export const getConversation=async(req,res)=>{
    const{userId}=req.params;
try {
    const messages=await Message.find({
        $or:[
            {sender:req.user._id,receiver:userId},
            {sender:userId,receiver:req.user._id}
        ]
    }).sort("createdAt")
    
    res.status(200).json({
        success:true,
        messages
    })
} catch (error) {
   console.log("error  in the getConversation :",error)
   return res.status(400).json({
    success:false,
    message:"Internal server Error"
   }) 
}
}