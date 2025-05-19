import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { getSocket } from "../socket/socket.client"
import { useAuthStore } from "./useAuthStore"
import { useMatchStore } from "./useMatchStore"
export const useMessageStore=create((set)=>({
messages:[],
loading:true,
senderId:null,
typingIds:false,


sendMessage:async(receiverId,content)=>{
   try {
    // mackup a message show it is the chat immdiately
    set((state)=>({
        messages:[...state.messages,{_id:Date.now(),sender:useAuthStore.getState().authUser._id,content}]
    }))
    const res=await axiosInstance.post('/messages/send',{receiverId,content})
   console.log("message sent",res.data)
} catch (error) {
    toast.error(error.response.data.message|| "Something was wrong")
   } 
},
getMessages:async(userId)=>{
try {
    set({loading:true})
    const res=await axiosInstance.get(`/messages/conversation/${userId}`)
set({messages:res.data.messages})
} catch (error) {
    console.log(error)
    set({messages:[]})
}finally{
set({loading:false})
}
},
typingIndicated:async()=>{
try {
    const socket=getSocket();
//     const {id}=useParams();
    
//     socket.emit("typing",{senderId:authUser._id,receiverId:id});
//     socket.on("typing",({senderId,receiverId})=>{
//   if(receiverId===authUser._id){
//     setTyingId (true)
//   }
//     })
} catch (error) {
    console.log("cient typingIndicated",error)
}
},
subscribeTonMessages:()=>{
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
        set((state) => ({ messages: [...state.messages, message] }));
    });

 

},
unsubscribeFromMessages:()=>{
    const socket=getSocket();
    socket.off("newMessage");
}


}))